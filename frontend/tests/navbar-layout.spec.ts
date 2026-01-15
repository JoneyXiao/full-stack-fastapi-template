import { expect, test } from "@playwright/test"

// Fresh storage state (not logged in)
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("Navbar Layout", () => {
  test("Navbar is visible on landing page (/)", async ({ page }) => {
    await page.goto("/")

    const navbar = page.getByTestId("app-navbar")
    await expect(navbar).toBeVisible()
  })

  test("Navbar is visible on resources page (/resources)", async ({ page }) => {
    await page.goto("/resources")

    const navbar = page.getByTestId("app-navbar")
    await expect(navbar).toBeVisible()
  })

  test("Navbar is not visible on login page (/login)", async ({ page }) => {
    await page.goto("/login")

    // Login page uses AuthLayout (not the authenticated /_layout), so AppNavbar should not render.
    await expect(page.getByTestId("app-navbar")).toHaveCount(0)
  })

  test("Upper row contains expected elements", async ({ page }) => {
    await page.goto("/")

    // Logo should be visible
    const logo = page.getByTestId("nav-logo")
    await expect(logo).toBeVisible()

    // Search and Chat triggers should be visible
    const searchTrigger = page.getByTestId("nav-search-trigger")
    await expect(searchTrigger).toBeVisible()

    const chatTrigger = page.getByTestId("nav-chat-trigger")
    await expect(chatTrigger).toBeVisible()

    // Theme and locale switchers should be visible
    const themeSwitcher = page.getByTestId("nav-theme-switcher")
    await expect(themeSwitcher).toBeVisible()

    const localeSwitcher = page.getByTestId("nav-locale-switcher")
    await expect(localeSwitcher).toBeVisible()
  })

  test("Logo click navigates to home (/)", async ({ page }) => {
    // Start from a different page
    await page.goto("/resources")

    const logo = page.getByTestId("nav-logo")
    await logo.click()

    // Should navigate to home
    await expect(page).toHaveURL("/")
  })

  test("Lower row nav links are visible on desktop", async ({ page }) => {
    // Set a desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.goto("/")

    // Lower nav should contain navigation links
    const lowerNav = page.getByTestId("nav-lower-row")
    await expect(lowerNav).toBeVisible()

    // Dashboard link should be visible
    const dashboardLink = page.getByTestId("nav-link-/dashboard")
    await expect(dashboardLink).toBeVisible()

    // Resources link should be visible
    const resourcesLink = page.getByTestId("nav-link-/resources")
    await expect(resourcesLink).toBeVisible()
  })

  test("Signed-out state shows Login and Sign Up buttons", async ({ page }) => {
    await page.goto("/")

    const loginButton = page.getByTestId("nav-login")
    await expect(loginButton).toBeVisible()

    const signupButton = page.getByTestId("nav-signup")
    await expect(signupButton).toBeVisible()
  })

  test("No sidebar is present on authenticated layout routes", async ({
    page,
  }) => {
    await page.goto("/resources")

    // Sidebar should not exist
    const sidebar = page.locator('[data-testid="sidebar"]')
    await expect(sidebar).not.toBeVisible()
  })
})

test.describe("Navbar Mobile Menu", () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test("Mobile menu trigger is visible on small screens", async ({ page }) => {
    await page.goto("/")

    const mobileMenuTrigger = page.getByTestId("nav-mobile-menu")
    await expect(mobileMenuTrigger).toBeVisible()
  })

  test("Mobile menu drawer opens on click", async ({ page }) => {
    await page.goto("/")

    const mobileMenuTrigger = page.getByTestId("nav-mobile-menu")
    await mobileMenuTrigger.click()

    const mobileDrawer = page.getByTestId("nav-mobile-drawer")
    await expect(mobileDrawer).toBeVisible()
  })

  test("Mobile menu drawer closes on Escape key", async ({ page }) => {
    await page.goto("/")

    const mobileMenuTrigger = page.getByTestId("nav-mobile-menu")
    await mobileMenuTrigger.click()

    const mobileDrawer = page.getByTestId("nav-mobile-drawer")
    await expect(mobileDrawer).toBeVisible()

    // Press Escape to close
    await page.keyboard.press("Escape")

    await expect(mobileDrawer).not.toBeVisible()
  })

  test("Mobile menu drawer is keyboard accessible", async ({ page }) => {
    await page.goto("/")

    const mobileMenuTrigger = page.getByTestId("nav-mobile-menu")
    await mobileMenuTrigger.click()

    const mobileDrawer = page.getByTestId("nav-mobile-drawer")
    await expect(mobileDrawer).toBeVisible()

    // Tab to navigate through items
    await page.keyboard.press("Tab")

    // Verify focus is within the drawer
    const focusedElement = page.locator(":focus")
    await expect(focusedElement).toBeVisible()

    // Should be able to activate with Enter
    const firstLink = mobileDrawer.getByRole("link").first()
    await firstLink.focus()
    await page.keyboard.press("Enter")

    // Drawer should close after navigation
    await expect(mobileDrawer).not.toBeVisible()
  })
})
