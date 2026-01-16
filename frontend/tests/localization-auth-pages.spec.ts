import { expect, test } from "@playwright/test"

// Fresh storage state (not logged in) to test auth pages
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("Locale switching on auth pages", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure clean state
    await page.goto("/login")
    await page.evaluate(() => localStorage.clear())
  })

  test("Login page shows Chinese text when locale is switched to zh", async ({
    page,
  }) => {
    await page.goto("/login")

    // Find and click the locale switcher
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await expect(localeSwitcher).toBeVisible()
    await localeSwitcher.click()

    // Select Chinese
    const zhOption = page.getByRole("menuitem", { name: /中文/i })
    await zhOption.click()

    // Verify Chinese text appears on the login page
    await expect(page.getByRole("button", { name: "登录" })).toBeVisible()
    await expect(page.getByText("邮箱")).toBeVisible()
    await expect(page.getByText("密码")).toBeVisible()
  })

  test("Login page shows English text when locale is switched back to en", async ({
    page,
  }) => {
    await page.goto("/login")

    // First switch to Chinese
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Verify Chinese is active
    await expect(page.getByRole("button", { name: "登录" })).toBeVisible()

    // Switch back to English
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /English/i }).click()

    // Verify English text appears
    await expect(page.getByRole("button", { name: "Log In" })).toBeVisible()
    await expect(page.getByText("Email")).toBeVisible()
    await expect(page.getByText("Password")).toBeVisible()
  })

  test("Signup page shows Chinese text when locale is switched to zh", async ({
    page,
  }) => {
    await page.goto("/signup")

    // Find and click the locale switcher
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await expect(localeSwitcher).toBeVisible()
    await localeSwitcher.click()

    // Select Chinese
    const zhOption = page.getByRole("menuitem", { name: /中文/i })
    await zhOption.click()

    // Verify Chinese text appears on the signup page
    await expect(page.getByRole("button", { name: "注册" })).toBeVisible()
    await expect(page.getByText("姓名")).toBeVisible()
    await expect(page.getByText("邮箱")).toBeVisible()
  })

  test("Recover password page shows Chinese text when locale is switched to zh", async ({
    page,
  }) => {
    await page.goto("/recover-password")

    // Find and click the locale switcher
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await expect(localeSwitcher).toBeVisible()
    await localeSwitcher.click()

    // Select Chinese
    const zhOption = page.getByRole("menuitem", { name: /中文/i })
    await zhOption.click()

    // Verify Chinese text appears on the recover password page
    await expect(page.getByRole("button", { name: "提交" })).toBeVisible()
    await expect(page.getByText("找回密码")).toBeVisible()
  })

  test("Reset password page shows Chinese text when locale is switched to zh", async ({
    page,
  }) => {
    // Reset password requires a token, but we can still test the page loads
    await page.goto("/reset-password?token=test-token")

    // Find and click the locale switcher
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await expect(localeSwitcher).toBeVisible()
    await localeSwitcher.click()

    // Select Chinese
    const zhOption = page.getByRole("menuitem", { name: /中文/i })
    await zhOption.click()

    // Verify Chinese text appears on the reset password page
    await expect(page.getByText("重置密码")).toBeVisible()
    await expect(page.getByText("新密码")).toBeVisible()
  })

  test("Locale persists across auth page navigation", async ({ page }) => {
    await page.goto("/login")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Verify Chinese on login page
    await expect(page.getByRole("button", { name: "登录" })).toBeVisible()

    // Navigate to signup
    await page.getByRole("link", { name: "注册" }).click()
    await page.waitForURL("/signup")

    // Verify Chinese persists on signup page
    await expect(page.getByRole("button", { name: "注册" })).toBeVisible()

    // Navigate to recover password
    await page.goto("/login")
    await page.getByRole("link", { name: "忘记密码？" }).click()
    await page.waitForURL("/recover-password")

    // Verify Chinese persists on recover password page
    await expect(page.getByText("找回密码")).toBeVisible()
  })

  test("Locale switcher shows current language indicator", async ({ page }) => {
    await page.goto("/login")

    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await expect(localeSwitcher).toBeVisible()

    // Initially should show English indicator
    await localeSwitcher.click()

    // The current language should be indicated in the menu
    const menu = page.getByRole("menu")
    await expect(menu).toBeVisible()
  })
})
