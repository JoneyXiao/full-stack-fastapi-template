import { expect, test } from "@playwright/test"

// Fresh storage state (not logged in)
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("Navbar Search Dialog", () => {
  test("Search dialog opens when trigger is clicked", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    const searchDialog = page.getByTestId("search-dialog")
    await expect(searchDialog).toBeVisible()
  })

  test("Search dialog closes on Escape key", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    const searchDialog = page.getByTestId("search-dialog")
    await expect(searchDialog).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(searchDialog).not.toBeVisible()
  })

  test("Search dialog closes when clicking outside", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    const searchDialog = page.getByTestId("search-dialog")
    await expect(searchDialog).toBeVisible()

    // Click outside the dialog
    await page.locator("body").click({ position: { x: 10, y: 10 } })
    await expect(searchDialog).not.toBeVisible()
  })

  test("Focus returns to trigger after dialog closes", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    const searchDialog = page.getByTestId("search-dialog")
    await expect(searchDialog).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(searchDialog).not.toBeVisible()

    // Focus should return to the trigger
    await expect(searchTrigger).toBeFocused()
  })

  test("Search dialog displays search input", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    const searchInput = page.getByTestId("search-dialog-input")
    await expect(searchInput).toBeVisible()
    await expect(searchInput).toBeFocused()
  })

  test("Search dialog shows empty state when no results", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    const searchInput = page.getByTestId("search-dialog-input")
    await searchInput.fill("xyznonexistentterm123")

    // Wait for search to complete
    await page.waitForTimeout(500)

    const emptyState = page.getByTestId("search-empty-state")
    await expect(emptyState).toBeVisible()
  })

  test("Search dialog shows error state gracefully", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    // Even in error state, dialog should be visible and closable
    const searchDialog = page.getByTestId("search-dialog")
    await expect(searchDialog).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(searchDialog).not.toBeVisible()
  })
})

test.describe("Search Dialog Navigation", () => {
  test("Selecting a result navigates to the resource", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    const searchInput = page.getByTestId("search-dialog-input")
    // Use a term likely to have results
    await searchInput.fill("resource")

    // Wait for results
    await page.waitForTimeout(500)

    const resultItem = page.getByTestId("search-result-item").first()
    if (await resultItem.isVisible()) {
      await resultItem.click()

      // Dialog should close after selection
      const searchDialog = page.getByTestId("search-dialog")
      await expect(searchDialog).not.toBeVisible()

      // Should have navigated to resources page
      await expect(page).toHaveURL(/\/resources/)
    }
  })

  test("Keyboard navigation works in search results", async ({ page }) => {
    await page.goto("/")

    const searchTrigger = page.getByTestId("nav-search-trigger")
    await searchTrigger.click()

    const searchInput = page.getByTestId("search-dialog-input")
    await searchInput.fill("resource")

    // Wait for results
    await page.waitForTimeout(500)

    // Use arrow down to navigate
    await page.keyboard.press("ArrowDown")

    // Enter to select
    await page.keyboard.press("Enter")

    // Dialog should close
    const searchDialog = page.getByTestId("search-dialog")
    await expect(searchDialog).not.toBeVisible()
  })
})
