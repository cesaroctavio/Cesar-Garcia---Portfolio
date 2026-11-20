import { expect, test } from "@playwright/test";

test.describe("mobile menu", () => {
  test.skip(({ isMobile }) => !isMobile, "menu toggle only shows on small screens");

  test("opens and closes with the toggle", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const sheet = page.getByRole("dialog", { name: "Site menu" });
    await expect(sheet).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(sheet).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("closes with Escape and offers CV and email", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const sheet = page.getByRole("dialog", { name: "Site menu" });
    await expect(sheet.getByRole("link", { name: "Download CV (PDF)" })).toBeVisible();
    await expect(sheet.getByRole("link", { name: "Email me" })).toHaveAttribute("href", /^mailto:/);

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
  });

  test("tapping the dimmed page closes it, and closed links can't take focus", async ({ page }) => {
    await page.goto("/");
    const firstLink = page.locator("#mobile-navigation a").first();
    expect(await firstLink.evaluate((el) => (el.focus(), document.activeElement === el))).toBe(false);

    await page.getByRole("button", { name: "Open menu" }).click();
    const sheet = page.getByRole("dialog", { name: "Site menu" });
    await expect(sheet).toBeVisible();
    const viewport = page.viewportSize()!;
    await page.mouse.click(viewport.width / 2, viewport.height - 20);
    await expect(sheet).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("opening it mid-page keeps the reader's place and the close button in view", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo({ top: 1400, behavior: "instant" }));
    const box = (await page.locator(".site-nav__toggle").boundingBox())!;
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(page.getByRole("dialog", { name: "Site menu" })).toBeVisible();
    expect(await page.evaluate(() => window.scrollY)).toBe(1400);
    await expect(page.getByRole("button", { name: "Close menu" })).toBeInViewport();
  });
});

test("CV downloads as a PDF", async ({ page }) => {
  await page.goto("/");
  const download = page.waitForEvent("download");
  await page.locator("#hero").getByRole("link", { name: "Download CV (PDF)" }).click();
  expect((await download).suggestedFilename()).toMatch(/\.pdf$/);
});

test("contact card offers email, CV and copy", async ({ page }) => {
  await page.goto("/#contact");
  const contact = page.locator("#contact");
  await expect(contact.getByRole("link", { name: "Email me" })).toHaveAttribute("href", /^mailto:/);
  await expect(contact.getByRole("link", { name: "Download CV (PDF)" })).toBeVisible();
  await expect(contact.getByRole("button", { name: "Copy email" })).toBeVisible();
});

test("light theme persists across reloads", async ({ page, isMobile }) => {
  test.skip(isMobile, "the toggle is the same on mobile");
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#F5F4FA");
});

test("metadata points at the canonical domain", async ({ page, request, isMobile }) => {
  test.skip(isMobile, "metadata is the same on every viewport");
  await page.goto("/");
  const canonical = "https://cesargarcia.dev/";
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${canonical}og-image.png`);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  for (const path of ["/og-image.png", "/sitemap.xml", "/robots.txt"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  expect(await (await request.get("/robots.txt")).text()).toContain(`${canonical}sitemap.xml`);
});
