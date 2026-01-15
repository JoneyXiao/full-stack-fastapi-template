import { expect, test } from "@playwright/test"

// Use authenticated state for signed-in tests
test.describe("Locale switching in signed-in navbar", () => {
  test.use({ storageState: "playwright/.auth/user.json" })

  test.beforeEach(async ({ page }) => {
    // Clear locale from localStorage to ensure clean state
    await page.goto("/dashboard")
    await page.evaluate(() => localStorage.removeItem("locale"))
    await page.reload()
  })

  test("Navbar shows Chinese text when locale is switched to zh", async ({
    page,
  }) => {
    await page.goto("/dashboard")

    // Find and click the locale switcher in navbar
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await expect(localeSwitcher).toBeVisible()
    await localeSwitcher.click()

    // Select Chinese
    const zhOption = page.getByRole("menuitem", { name: /中文/i })
    await zhOption.click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify Chinese text appears in navbar navigation links
    await expect(page.getByTestId("nav-link-/dashboard")).toContainText(
      "仪表盘",
    )
    await expect(page.getByTestId("nav-link-/resources")).toContainText("资源")
  })

  test("Navbar shows English text when locale is switched back to en", async ({
    page,
  }) => {
    await page.goto("/dashboard")

    // First switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify Chinese is active
    await expect(page.getByTestId("nav-link-/dashboard")).toContainText(
      "仪表盘",
    )

    // Switch back to English
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /English/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify English text appears in navbar
    await expect(page.getByTestId("nav-link-/dashboard")).toContainText(
      "Dashboard",
    )
    await expect(page.getByTestId("nav-link-/resources")).toContainText(
      "Resources",
    )
  })

  test("Dashboard content shows Chinese text when locale is switched", async ({
    page,
  }) => {
    await page.goto("/dashboard")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify Chinese dashboard welcome message appears
    // The welcome message should contain Chinese text
    await expect(page.getByText(/欢迎/)).toBeVisible()
  })

  test("Resources page content shows Chinese text when locale is switched", async ({
    page,
  }) => {
    await page.goto("/resources")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify Chinese text on resources page
    await expect(page.getByRole("heading", { name: "AI 资源" })).toBeVisible()
  })

  test("Locale persists across page navigation within app", async ({
    page,
  }) => {
    await page.goto("/dashboard")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Navigate to resources page
    await page.getByTestId("nav-link-/resources").click()
    await page.waitForURL("/resources")

    // Verify Chinese persists
    await expect(page.getByRole("heading", { name: "AI 资源" })).toBeVisible()

    // Navigate to favorites
    await page.getByTestId("nav-link-/favorites").click()
    await page.waitForURL("/favorites")

    // Verify Chinese persists on favorites page
    await expect(page.getByRole("heading", { name: "我的收藏" })).toBeVisible()
  })

  test("Locale change does not require page refresh", async ({ page }) => {
    await page.goto("/dashboard")

    // Get the initial text
    const dashboardLink = page.getByTestId("nav-link-/dashboard")
    await expect(dashboardLink).toContainText("Dashboard")

    // Switch to Chinese without refreshing
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update (no page refresh should be needed)
    await page.waitForTimeout(100)

    // The text should change without refresh
    await expect(dashboardLink).toContainText("仪表盘")

    // Verify URL hasn't changed (no refresh/reload occurred)
    expect(page.url()).toContain("/dashboard")
  })

  test("Account menu shows Chinese text when locale is switched", async ({
    page,
  }) => {
    await page.goto("/dashboard")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Open account menu
    const accountMenu = page.getByTestId("account-menu")
    await accountMenu.click()

    // Verify Chinese text in account menu
    await expect(page.getByRole("menuitem", { name: /设置/i })).toBeVisible()
    await expect(
      page.getByRole("menuitem", { name: /退出登录/i }),
    ).toBeVisible()
  })
})

// Tests for signed-out navbar
test.describe("Locale switching in signed-out navbar", () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test("Signed-out navbar shows Chinese auth buttons when locale is switched", async ({
    page,
  }) => {
    await page.goto("/")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify Chinese text on auth buttons
    await expect(page.getByTestId("nav-login")).toContainText("登录")
    await expect(page.getByTestId("nav-signup")).toContainText("注册")
  })

  test("Landing page content shows Chinese text when locale is switched", async ({
    page,
  }) => {
    await page.goto("/")

    // Switch to Chinese
    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify Chinese text on landing page (hero section)
    await expect(page.getByText(/发现最佳的 AI 工具和资源/)).toBeVisible()
  })
})
