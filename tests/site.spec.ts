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
