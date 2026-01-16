import { expect, test } from "@playwright/test"

test.describe("Locale defaulting and language mapping", () => {
  test.describe("Browser language defaulting", () => {
    test("Defaults to English when browser language is English", async ({
      browser,
    }) => {
      // Create context with English browser locale
      const context = await browser.newContext({
        locale: "en-US",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify English is used
      await expect(page.getByTestId("nav-login")).toContainText("Log In")
      await expect(page.getByTestId("nav-signup")).toContainText("Sign Up")

      await context.close()
    })

    test("Defaults to Chinese when browser language is zh-CN", async ({
      browser,
    }) => {
      // Create context with Simplified Chinese browser locale
      const context = await browser.newContext({
        locale: "zh-CN",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify Chinese is used
      await expect(page.getByTestId("nav-login")).toContainText("登录")
      await expect(page.getByTestId("nav-signup")).toContainText("注册")

      await context.close()
    })

    test("Maps zh-TW (Traditional Chinese) to zh", async ({ browser }) => {
      // Create context with Traditional Chinese browser locale
      const context = await browser.newContext({
        locale: "zh-TW",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify Chinese is used (zh-TW should map to zh)
      await expect(page.getByTestId("nav-login")).toContainText("登录")

      await context.close()
    })

    test("Maps zh-HK (Hong Kong Chinese) to zh", async ({ browser }) => {
      // Create context with Hong Kong Chinese browser locale
      const context = await browser.newContext({
        locale: "zh-HK",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify Chinese is used (zh-HK should map to zh)
      await expect(page.getByTestId("nav-login")).toContainText("登录")

      await context.close()
    })

    test("Maps zh-SG (Singapore Chinese) to zh", async ({ browser }) => {
      // Create context with Singapore Chinese browser locale
      const context = await browser.newContext({
        locale: "zh-SG",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify Chinese is used (zh-SG should map to zh)
      await expect(page.getByTestId("nav-login")).toContainText("登录")

      await context.close()
    })

    test("Falls back to English for unsupported languages", async ({
      browser,
    }) => {
      // Create context with French browser locale (unsupported)
      const context = await browser.newContext({
        locale: "fr-FR",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify English fallback is used
      await expect(page.getByTestId("nav-login")).toContainText("Log In")
      await expect(page.getByTestId("nav-signup")).toContainText("Sign Up")

      await context.close()
    })

    test("Falls back to English for Japanese (unsupported)", async ({
      browser,
    }) => {
      // Create context with Japanese browser locale (unsupported)
      const context = await browser.newContext({
        locale: "ja-JP",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify English fallback is used
      await expect(page.getByTestId("nav-login")).toContainText("Log In")

      await context.close()
    })
  })

  test.describe("LocalStorage preference takes precedence", () => {
    test("LocalStorage locale overrides browser language", async ({
      browser,
    }) => {
      // Create context with English browser locale
      const context = await browser.newContext({
        locale: "en-US",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Set Chinese in localStorage
      await page.goto("/")
      await page.evaluate(() => localStorage.setItem("locale", "zh"))
      await page.reload()
      await page.waitForTimeout(200)

      // Verify Chinese is used (localStorage overrides browser language)
      await expect(page.getByTestId("nav-login")).toContainText("登录")

      await context.close()
    })

    test("LocalStorage English overrides Chinese browser language", async ({
      browser,
    }) => {
      // Create context with Chinese browser locale
      const context = await browser.newContext({
        locale: "zh-CN",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Set English in localStorage
      await page.goto("/")
      await page.evaluate(() => localStorage.setItem("locale", "en"))
      await page.reload()
      await page.waitForTimeout(200)

      // Verify English is used (localStorage overrides browser language)
      await expect(page.getByTestId("nav-login")).toContainText("Log In")

      await context.close()
    })
  })

  test.describe("First-use experience", () => {
    test("First visit with no stored preference uses browser language", async ({
      browser,
    }) => {
      // Create context with Chinese browser locale
      const context = await browser.newContext({
        locale: "zh-CN",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Ensure completely clean state
      await page.goto("/")
      await page.evaluate(() => {
        localStorage.clear()
        sessionStorage.clear()
      })
      await page.reload()
      await page.waitForTimeout(200)

      // Verify Chinese is detected from browser
      await expect(page.getByTestId("nav-login")).toContainText("登录")

      await context.close()
    })

    test("Switching language saves preference for future visits", async ({
      browser,
    }) => {
      // Create context with English browser locale
      const context = await browser.newContext({
        locale: "en-US",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear storage
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Initially should be English
      await expect(page.getByTestId("nav-login")).toContainText("Log In")

      // Switch to Chinese
      const localeSwitcher = page.getByTestId("nav-locale-switcher")
      await localeSwitcher.click()
      await page.getByRole("menuitem", { name: /中文/i }).click()
      await page.waitForTimeout(200)

      // Verify localStorage was updated
      const storedLocale = await page.evaluate(() =>
        localStorage.getItem("locale"),
      )
      expect(storedLocale).toBe("zh")

      // Create a new page to simulate reopening browser
      const newPage = await context.newPage()
      await newPage.goto("/")
      await newPage.waitForTimeout(200)

      // Should still be Chinese
      await expect(newPage.getByTestId("nav-login")).toContainText("登录")

      await newPage.close()
      await context.close()
    })
  })

  test.describe("Edge cases", () => {
    test("Invalid stored locale falls back to browser language", async ({
      browser,
    }) => {
      // Create context with English browser locale
      const context = await browser.newContext({
        locale: "en-US",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Set an invalid locale in localStorage
      await page.goto("/")
      await page.evaluate(() => localStorage.setItem("locale", "invalid"))
      await page.reload()
      await page.waitForTimeout(200)

      // Should fall back to English (browser language)
      await expect(page.getByTestId("nav-login")).toContainText("Log In")

      await context.close()
    })

    test("Browser language with region code (en-GB) maps to en", async ({
      browser,
    }) => {
      // Create context with British English browser locale
      const context = await browser.newContext({
        locale: "en-GB",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify English is used (en-GB should map to en)
      await expect(page.getByTestId("nav-login")).toContainText("Log In")

      await context.close()
    })

    test("Browser language with region code (en-AU) maps to en", async ({
      browser,
    }) => {
      // Create context with Australian English browser locale
      const context = await browser.newContext({
        locale: "en-AU",
        storageState: { cookies: [], origins: [] },
      })
      const page = await context.newPage()

      // Clear any existing locale preference
      await page.goto("/")
      await page.evaluate(() => localStorage.clear())
      await page.reload()
      await page.waitForTimeout(200)

      // Verify English is used (en-AU should map to en)
      await expect(page.getByTestId("nav-login")).toContainText("Log In")

      await context.close()
    })
  })
})
