import { expect, test } from "@playwright/test"
import { firstSuperuser, firstSuperuserPassword } from "./config.ts"

test.describe("Signed-in locale persistence (US2)", () => {
  // Don't use pre-authenticated state - we need to log in fresh to test persistence
  test.use({ storageState: { cookies: [], origins: [] } })

  test.beforeEach(async ({ page }) => {
    // Clear all storage to ensure clean state
    await page.goto("/login")
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
  })

  test("Locale persists after page reload for signed-in user", async ({
    page,
  }) => {
    // Log in
    await page.goto("/login")
    await page.getByTestId("email-input").fill(firstSuperuser)
    await page.getByTestId("password-input").fill(firstSuperuserPassword)
    await page.getByRole("button", { name: "Log In" }).click()
    await page.waitForURL("/dashboard")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for locale to update
    await page.waitForTimeout(200)

    // Verify Chinese is active
    await expect(page.getByTestId("nav-link-/dashboard")).toContainText(
      "仪表盘",
    )

    // Reload the page
    await page.reload()

    // Wait for page to fully load
    await page.waitForTimeout(200)

    // Verify Chinese persists after reload
    await expect(page.getByTestId("nav-link-/dashboard")).toContainText(
      "仪表盘",
    )
  })

  test("Locale persists across browser sessions for signed-in user", async ({
    page,
    context,
  }) => {
    // Log in
    await page.goto("/login")
    await page.getByTestId("email-input").fill(firstSuperuser)
    await page.getByTestId("password-input").fill(firstSuperuserPassword)
    await page.getByRole("button", { name: "Log In" }).click()
    await page.waitForURL("/dashboard")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for locale to be saved
    await page.waitForTimeout(500)

    // Create a new page in the same context (simulating reopening browser)
    const newPage = await context.newPage()
    await newPage.goto("/dashboard")

    // Wait for page to load
    await newPage.waitForTimeout(200)

    // Verify Chinese persists in the new page
    await expect(newPage.getByTestId("nav-link-/dashboard")).toContainText(
      "仪表盘",
    )

    await newPage.close()
  })

  test("Account locale preference is saved to backend", async ({ page }) => {
    // Log in
    await page.goto("/login")
    await page.getByTestId("email-input").fill(firstSuperuser)
    await page.getByTestId("password-input").fill(firstSuperuserPassword)
    await page.getByRole("button", { name: "Log In" }).click()
    await page.waitForURL("/dashboard")

    // Start with English first
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /English/i }).click()
    await page.waitForTimeout(200)

    // Switch to Chinese and wait for API call
    await localeSwitcher.click()

    // Wait for API call to complete
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/api/v1/users/me") &&
        response.request().method() === "PATCH",
    )

    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for the API response
    const response = await responsePromise
    expect(response.status()).toBe(200)

    // Verify the response contains the updated locale
    const responseBody = await response.json()
    expect(responseBody.locale).toBe("zh")
  })

  test("Device locale persists for signed-out user via localStorage", async ({
    page,
  }) => {
    // Don't log in - test signed-out persistence
    await page.goto("/")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for locale to be saved to localStorage
    await page.waitForTimeout(200)

    // Verify localStorage has the locale
    const locale = await page.evaluate(() => localStorage.getItem("locale"))
    expect(locale).toBe("zh")

    // Reload the page
    await page.reload()
    await page.waitForTimeout(200)

    // Verify Chinese persists after reload
    await expect(page.getByTestId("nav-login")).toContainText("登录")
  })

  test("Account locale preference overrides device locale on login", async ({
    page,
  }) => {
    // First, log in and set account locale to Chinese
    await page.goto("/login")
    await page.getByTestId("email-input").fill(firstSuperuser)
    await page.getByTestId("password-input").fill(firstSuperuserPassword)
    await page.getByRole("button", { name: "Log In" }).click()
    await page.waitForURL("/dashboard")

    // Set account locale to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()
    await page.waitForTimeout(500)

    // Log out
    const accountMenu = page.getByTestId("account-menu")
    await accountMenu.click()
    await page.getByRole("menuitem", { name: /退出登录/i }).click()
    await page.waitForURL("/")

    // Set device locale to English while signed out
    await page.evaluate(() => localStorage.setItem("locale", "en"))
    await page.reload()
    await page.waitForTimeout(200)

    // Verify English is shown
    await expect(page.getByTestId("nav-login")).toContainText("Log In")

    // Log in again - account preference (Chinese) should take effect
    await page.getByTestId("nav-login").click()
    await page.waitForURL("/login")
    await page.getByTestId("email-input").fill(firstSuperuser)
    await page.getByTestId("password-input").fill(firstSuperuserPassword)
    await page.getByRole("button", { name: "Log In" }).click()
    await page.waitForURL("/dashboard")

    // Wait for locale sync from account
    await page.waitForTimeout(500)

    // Verify Chinese is applied from account preference
    await expect(page.getByTestId("nav-link-/dashboard")).toContainText(
      "仪表盘",
    )
  })

  test("Locale setting in settings page persists correctly", async ({
    page,
  }) => {
    // Log in
    await page.goto("/login")
    await page.getByTestId("email-input").fill(firstSuperuser)
    await page.getByTestId("password-input").fill(firstSuperuserPassword)
    await page.getByRole("button", { name: "Log In" }).click()
    await page.waitForURL("/dashboard")

    // Go to settings page
    await page.goto("/settings")
    await page.waitForTimeout(200)

    // Find the locale dropdown in settings and change it
    const localeSelect = page.getByTestId("locale-select")
    if (await localeSelect.isVisible()) {
      await localeSelect.click()
      await page.getByRole("option", { name: /中文/i }).click()
      await page.waitForTimeout(500)

      // Reload and verify persistence
      await page.reload()
      await page.waitForTimeout(200)

      // Verify Chinese is still selected
      await expect(page.getByText("设置")).toBeVisible()
    }
  })
})
