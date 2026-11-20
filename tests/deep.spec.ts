import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Scroll the whole page in steps so every scroll reveal fires, then return to the top.
async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
  await page.waitForTimeout(900);
}

// Wait until smooth scrolling has come to rest (two equal readings in a row).
async function scrollSettled(page: Page) {
  let last = -1;
  await expect
    .poll(async () => {
      const y = await page.evaluate(() => Math.round(window.scrollY));
      const settled = y === last;
      last = y;
      return settled;
    }, { intervals: [150] })
    .toBe(true);
}

async function setTheme(page: Page, theme: "dark" | "light") {
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
}

test.describe("health on every device", () => {
  test("loads without console errors, page errors or failed requests", async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (msg) => msg.type() === "error" && problems.push(`console: ${msg.text()}`));
    page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
    page.on("requestfailed", (req) => problems.push(`failed: ${req.url()} ${req.failure()?.errorText}`));
    page.on("response", (res) => res.status() >= 400 && problems.push(`${res.status()}: ${res.url()}`));

    await page.goto("/");
    await scrollThrough(page);
    expect(problems).toEqual([]);
  });

  test("never scrolls sideways", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);
    const { scroll, client } = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(scroll).toBeLessThanOrEqual(client);
  });

  for (const theme of ["dark", "light"] as const) {
    test(`has no serious accessibility violations (${theme})`, async ({ page }) => {
      await setTheme(page, theme);
      await page.goto("/");
      await scrollThrough(page);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const serious = results.violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(serious).toEqual([]);
    });

    test(`full-page capture (${theme})`, async ({ page }, testInfo) => {
      await setTheme(page, theme);
      await page.goto("/");
      await scrollThrough(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.screenshot({ path: testInfo.outputPath(`${theme}-full.png`), fullPage: true });
    });
  }

  test("interactive targets are at least 24px on touch screens", async ({ page, isMobile }) => {
    test.skip(!isMobile, "touch target size matters on touch devices");
    await page.goto("/");
    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("a[href], button, summary")]
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.width > 0 && (r.height < 24 || r.width < 24))
        .map(({ el, r }) => `${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 30)} ${Math.round(r.width)}x${Math.round(r.height)}`),
    );
    expect(small).toEqual([]);
  });
});

test.describe("navigation", () => {
  test("every in-page link points at a real section", async ({ page }) => {
    await page.goto("/");
    const missing = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
        .map((a) => a.getAttribute("href")!)
        .filter((href) => href.length > 1 && !document.querySelector(href)),
    );
    expect(missing).toEqual([]);
  });

  test("desktop nav scrolls to a section and marks it current", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav links collapse into the menu on small screens");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const name of ["Work", "Skills", "About"]) {
      const link = nav.getByRole("link", { name, exact: true });
      await link.click();
      await scrollSettled(page);
      const target = (await link.getAttribute("href"))!;
      await expect(page.locator(target)).toBeInViewport();
      await expect(link).toHaveAttribute("aria-current", "location");
    }
    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("nav highlights the section being read, not the padding above it", async ({ page, isMobile }) => {
    test.skip(isMobile, "the highlight lives in the desktop nav");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const current = nav.locator('[aria-current="location"]');

    // The About heading sits mid-screen while Skills padding still fills the top quarter.
    await page.evaluate(() => {
      const heading = document.getElementById("about-title")!;
      window.scrollTo({ top: heading.getBoundingClientRect().top + window.scrollY - innerHeight * 0.5, behavior: "instant" });
    });
    await expect(current).toHaveText("About");

    // Triage has no nav entry, so nothing stays highlighted from Work.
    await page.evaluate(() => {
      const heading = document.getElementById("approach-title")!;
      window.scrollTo({ top: heading.getBoundingClientRect().top + window.scrollY - innerHeight * 0.3, behavior: "instant" });
    });
    await expect(current).toHaveCount(0);

    // At the very bottom the last section wins even if it never reaches the reading line.
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await expect(current).toHaveText("Contact");
  });

  test("mobile menu links close the sheet and reach their section", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the menu sheet only exists on small screens");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const sheet = page.getByRole("dialog", { name: "Site menu" });
    await sheet.getByRole("link", { name: "Skills" }).click();
    await expect(sheet).toBeHidden();
    await expect(page.locator("#skills")).toBeInViewport();
  });

  test("skip link moves focus to the main content", async ({ page, browserName, isMobile }) => {
    test.skip(isMobile, "skip links are a keyboard feature");
    test.skip(browserName === "webkit", "Safari skips links on Tab unless Option is held");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("back-to-top appears after scrolling and returns to the top", async ({ page, isMobile, browserName }) => {
    test.skip(isMobile, "back-to-top is hidden on small screens");
    test.fixme(browserName === "webkit", "headless WebKit stalls programmatic smooth scroll in 2 of 3 runs; check by hand in Safari");
    await page.goto("/");
    const toTop = page.getByRole("button", { name: "Scroll to top" });
    await expect(toTop).toHaveCount(0);
    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect(toTop).toBeVisible();
    await toTop.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
  });
});

test.describe("content and actions", () => {
  test("roles open and close with pointer and keyboard", async ({ page }) => {
    await page.goto("/");
    const role = page.locator(".role__details").first();
    const summary = role.locator("summary");
    await summary.scrollIntoViewIfNeeded();
    await summary.click();
    await expect(role).toHaveAttribute("open", "");
    await expect(role.locator(".role__points li").first()).toBeVisible();
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(role).not.toHaveAttribute("open", "");
  });

  test("stats count up to their real values", async ({ page }) => {
    await page.goto("/");
    const stats = page.locator(".stats");
    await expect(stats.locator(".visually-hidden")).toHaveText(["7+", "17", "55", "60"]);
    await stats.scrollIntoViewIfNeeded();
    await expect(stats.locator(".stat__value [aria-hidden]")).toHaveText(["7+", "17", "55", "60"], { timeout: 6000 });
  });

  test("CV link serves a PDF", async ({ page, request }) => {
    await page.goto("/");
    const href = await page.locator("#hero").getByRole("link", { name: "Download CV (PDF)" }).getAttribute("href");
    const res = await request.get(href!);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
  });

  test("external links open safely in a new tab", async ({ page }) => {
    await page.goto("/");
    const unsafe = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')]
        .filter((a) => a.target !== "_blank" || !a.rel.includes("noopener"))
        .map((a) => a.href),
    );
    expect(unsafe).toEqual([]);
  });

  test("copy email confirms success", async ({ page, context, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permissions are Chromium-only in Playwright");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/#contact");
    await page.locator("#contact").getByRole("button", { name: "Copy email" }).click();
    await expect(page.getByRole("status")).toHaveText("Copied to clipboard.");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("@");
  });

  test("copy email falls back to selecting the address when the clipboard fails", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
    });
    await page.goto("/#contact");
    await page.locator("#contact").getByRole("button", { name: "Copy email" }).click();
    await expect(page.getByRole("status")).toContainText("Couldn’t copy automatically");
    expect(await page.evaluate(() => window.getSelection()?.toString())).toContain("@");
  });
});

test.describe("preferences", () => {
  test("theme toggles both ways and survives a reload", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: "Switch to light mode" }).click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "light");
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(html).not.toHaveAttribute("data-theme", "light");
    await page.reload();
    await expect(html).not.toHaveAttribute("data-theme", "light");
  });

  test("browser bar colour matches the page background in both themes", async ({ page }) => {
    const paper = () =>
      page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--color-paper").trim().toUpperCase());
    const meta = () => page.locator('meta[name="theme-color"]').getAttribute("content").then((v) => v?.toUpperCase());

    await page.goto("/");
    expect(await meta()).toBe(await paper());
    await page.getByRole("button", { name: "Switch to light mode" }).click();
    expect(await meta()).toBe(await paper());
    await page.reload();
    expect(await meta()).toBe(await paper());
  });

  test("reduced motion shows everything immediately", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(".stat__value [aria-hidden]").first()).toHaveText("7+");
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll("[data-reveal], .word, .hero__fade")].filter(
        (el) => getComputedStyle(el).opacity === "0",
      ).length,
    );
    expect(hidden).toBe(0);
  });
});
