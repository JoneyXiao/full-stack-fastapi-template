import { expect, test } from "@playwright/test"

/**
 * Unsupported Browser Notice Tests
 *
 * These tests verify browser compatibility gating behavior by overriding
 * the User-Agent string to simulate supported and unsupported browsers.
 */

// User-Agent strings for testing
const UNSUPPORTED_CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
const UNSUPPORTED_FIREFOX_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90"
const UNSUPPORTED_SAFARI_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15"
const UNSUPPORTED_EDGE_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66"
const UNKNOWN_UA = "Mozilla/5.0 (compatible; UnknownBot/1.0)"

const SUPPORTED_CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
const SUPPORTED_FIREFOX_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120"
const SUPPORTED_SAFARI_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
const SUPPORTED_EDGE_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"

// Fresh storage state (not logged in)
test.use({ storageState: { cookies: [], origins: [] } })

async function addNoticeFlashTracker(page: {
  addInitScript: (script: () => void) => Promise<void>
}): Promise<void> {
  await page.addInitScript(() => {
    ;(window as any).__unsupportedNoticeWasVisible = false
    ;(window as any).__unsupportedNoticeTrackerDone = false

    var start = 0
    var maxMs = 1000
    var maxFrames = 60
    var frames = 0

    function sample() {
      frames += 1
      var el = document.getElementById("unsupported-browser-notice")
      var style = el ? window.getComputedStyle(el) : null
      var display = style ? style.display : "none"
      var hasRects = el ? el.getClientRects().length > 0 : false
      if (display !== "none" && hasRects) {
        ;(window as any).__unsupportedNoticeWasVisible = true
      }

      var timedOut = Date.now() - start > maxMs
      var frameLimit = frames >= maxFrames
      var done = timedOut || frameLimit || document.readyState === "complete"

      if (done) {
        ;(window as any).__unsupportedNoticeTrackerDone = true
        return
      }

      requestAnimationFrame(sample)
    }

    try {
      start = Date.now()
      requestAnimationFrame(sample)
    } catch (_e) {
      ;(window as any).__unsupportedNoticeTrackerDone = true
    }
  })
}

test.describe("Unsupported Browser Notice - User Story 1 (P1 MVP)", () => {
  test.describe("Unsupported Chrome (v90)", () => {
    test.use({ userAgent: UNSUPPORTED_CHROME_UA })

    test("shows full-page notice with bilingual message and version list", async ({
      page,
    }) => {
      await page.goto("/")

      // Notice should be visible
      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).toBeVisible()

      // App root should NOT be visible
      const appRoot = page.locator("#root")
      await expect(appRoot).not.toBeVisible()

      // Verify exact EN message (FR-002)
      await expect(notice).toContainText(
        "Your browser is too old to support this site.",
      )

      // Verify exact ZH message (FR-002)
      await expect(notice).toContainText("你的浏览器版本过旧，无法支持本网站。")

      // Verify exact EN helper text (FR-002a)
      await expect(notice).toContainText(
        "Please upgrade to one of the supported versions below.",
      )

      // Verify exact ZH helper text (FR-002a)
      await expect(notice).toContainText("请升级到下方支持的版本。")

      // Verify minimum versions list (FR-003)
      await expect(notice).toContainText("Chrome ≥ 107")
      await expect(notice).toContainText("Edge ≥ 107")
      await expect(notice).toContainText("Firefox ≥ 104")
      await expect(notice).toContainText("Safari ≥ 16")
    })
  })

  test.describe("Unsupported Firefox (v90)", () => {
    test.use({ userAgent: UNSUPPORTED_FIREFOX_UA })

    test("shows full-page notice", async ({ page }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).not.toBeVisible()

      await expect(notice).toContainText(
        "Your browser is too old to support this site.",
      )
      await expect(notice).toContainText("你的浏览器版本过旧，无法支持本网站。")
    })
  })

  test.describe("Unsupported Safari (v14)", () => {
    test.use({ userAgent: UNSUPPORTED_SAFARI_UA })

    test("shows full-page notice", async ({ page }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).not.toBeVisible()

      await expect(notice).toContainText(
        "Your browser is too old to support this site.",
      )
      await expect(notice).toContainText("你的浏览器版本过旧，无法支持本网站。")
    })
  })

  test.describe("Unsupported Edge (v90)", () => {
    test.use({ userAgent: UNSUPPORTED_EDGE_UA })

    test("shows full-page notice", async ({ page }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).not.toBeVisible()

      await expect(notice).toContainText(
        "Your browser is too old to support this site.",
      )
      await expect(notice).toContainText("你的浏览器版本过旧，无法支持本网站。")
    })
  })

  test.describe("Unknown/Unparseable User-Agent", () => {
    test.use({ userAgent: UNKNOWN_UA })

    test("shows full-page notice when UA cannot be parsed (edge case)", async ({
      page,
    }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).not.toBeVisible()

      // Should still show the minimum versions list
      await expect(notice).toContainText("Chrome ≥ 107")
      await expect(notice).toContainText("Edge ≥ 107")
      await expect(notice).toContainText("Firefox ≥ 104")
      await expect(notice).toContainText("Safari ≥ 16")
    })
  })
})

test.describe("Unsupported Browser Notice - User Story 2 (P2)", () => {
  test.describe("Supported Chrome (v120)", () => {
    test.use({ userAgent: SUPPORTED_CHROME_UA })

    test("hides notice and loads app normally", async ({ page }) => {
      await page.goto("/")

      // Notice should NOT be visible
      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).not.toBeVisible()

      // App root should be visible
      const appRoot = page.locator("#root")
      await expect(appRoot).toBeVisible()
    })

    test("does not flash notice on /login refresh", async ({ page }) => {
      await addNoticeFlashTracker(page)
      await page.goto("/login")

      await page.waitForFunction(
        () => (window as any).__unsupportedNoticeTrackerDone === true,
        undefined,
        { timeout: 5000 },
      )

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).not.toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).toBeVisible()

      await expect
        .poll(async () =>
          page.evaluate(() => (window as any).__unsupportedNoticeWasVisible),
        )
        .toBeFalsy()

      await page.reload()

      await page.waitForFunction(
        () => (window as any).__unsupportedNoticeTrackerDone === true,
        undefined,
        { timeout: 5000 },
      )

      await expect(notice).not.toBeVisible()
      await expect(appRoot).toBeVisible()

      await expect
        .poll(async () =>
          page.evaluate(() => (window as any).__unsupportedNoticeWasVisible),
        )
        .toBeFalsy()
    })
  })

  test.describe("Supported Firefox (v120)", () => {
    test.use({ userAgent: SUPPORTED_FIREFOX_UA })

    test("hides notice and loads app normally", async ({ page }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).not.toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).toBeVisible()
    })
  })

  test.describe("Supported Safari (v17)", () => {
    test.use({ userAgent: SUPPORTED_SAFARI_UA })

    test("hides notice and loads app normally", async ({ page }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).not.toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).toBeVisible()
    })
  })

  test.describe("Supported Edge (v120)", () => {
    test.use({ userAgent: SUPPORTED_EDGE_UA })

    test("hides notice and loads app normally", async ({ page }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).not.toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).toBeVisible()
    })
  })
})

test.describe("Unsupported Browser Notice - Edge Cases", () => {
  test.describe("Borderline Chrome (v107 - minimum supported)", () => {
    test.use({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
    })

    test("browser at minimum version should load app normally", async ({
      page,
    }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).not.toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).toBeVisible()
    })
  })

  test.describe("Borderline Chrome (v106 - just below minimum)", () => {
    test.use({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    })

    test("browser just below minimum version should show notice", async ({
      page,
    }) => {
      await page.goto("/")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).not.toBeVisible()
    })
  })

  test.describe("Deep link to nested URL with unsupported browser", () => {
    test.use({ userAgent: UNSUPPORTED_CHROME_UA })

    test("shows notice consistently on nested routes", async ({ page }) => {
      await page.goto("/resources")

      const notice = page.locator("#unsupported-browser-notice")
      await expect(notice).toBeVisible()

      const appRoot = page.locator("#root")
      await expect(appRoot).not.toBeVisible()
    })
  })
})
