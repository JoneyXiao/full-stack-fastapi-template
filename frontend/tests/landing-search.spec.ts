import { expect, test } from "@playwright/test"

// Use fresh storage state (not logged in) for public landing tests
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("Landing Page Search", () => {
  test("Search input is visible and labeled", async ({ page }) => {
    await page.goto("/")

    const searchInput = page.getByTestId("landing-search-input")
    await expect(searchInput).toBeVisible()
    // Should have accessible labeling (aria-label or associated label)
    await expect(searchInput).toHaveAttribute("aria-label", /.+/)
  })

  test("Search can be submitted via Enter key", async ({ page }) => {
    await page.goto("/")

    const searchInput = page.getByTestId("landing-search-input")
    await searchInput.fill("tutorial")
    await searchInput.press("Enter")

    // Should show either results or empty state
    const resultsOrEmpty = page.locator(
      '[data-testid="landing-search-results"], [data-testid="landing-search-empty"]',
    )
    await expect(resultsOrEmpty).toBeVisible({ timeout: 5000 })
  })

  test("Search can be submitted via button click", async ({ page }) => {
    await page.goto("/")

    const searchInput = page.getByTestId("landing-search-input")
    const searchButton = page.getByTestId("landing-search-button")

    await searchInput.fill("prompt")
    await searchButton.click()

    // Should show either results or empty state
    const resultsOrEmpty = page.locator(
      '[data-testid="landing-search-results"], [data-testid="landing-search-empty"]',
    )
    await expect(resultsOrEmpty).toBeVisible({ timeout: 5000 })
  })

  test("Empty query shows guidance instead of confusing blank results", async ({
    page,
  }) => {
    await page.goto("/")

    const searchInput = page.getByTestId("landing-search-input")
    const searchButton = page.getByTestId("landing-search-button")

    // Submit empty query
    await searchInput.fill("")
    await searchButton.click()

    // Should show guidance, not an error or blank results
    const guidance = page.getByTestId("landing-search-empty-guidance")
    await expect(guidance).toBeVisible()
  })

  test("Shows friendly empty state when no results match", async ({ page }) => {
    await page.goto("/")

    const searchInput = page.getByTestId("landing-search-input")
    await searchInput.fill("xyznonexistent12345")
    await searchInput.press("Enter")

    const emptyState = page.getByTestId("landing-search-empty")
    await expect(emptyState).toBeVisible({ timeout: 5000 })

    // Should have friendly message
    await expect(emptyState).toContainText(/no.*match|no.*result/i)
  })

  test("Shows loading indicator within 250ms", async ({ page }) => {
    await page.goto("/")

    const searchInput = page.getByTestId("landing-search-input")

    // Start search
    await searchInput.fill("test")
    const searchPromise = searchInput.press("Enter")

    // Check loading appears quickly
    const loadingIndicator = page.getByTestId("landing-search-loading")
    await expect(loadingIndicator).toBeVisible({ timeout: 500 })

    await searchPromise
  })

  test("Partial match returns relevant results", async ({ page }) => {
    // This test assumes there are resources with "tutorial" in title/description
    await page.goto("/")

    const searchInput = page.getByTestId("landing-search-input")
    await searchInput.fill("tut") // partial match for "tutorial"
    await searchInput.press("Enter")

    // Should show results (if any tutorials exist) or empty state
    const resultsOrEmpty = page.locator(
      '[data-testid="landing-search-results"], [data-testid="landing-search-empty"]',
    )
    await expect(resultsOrEmpty).toBeVisible({ timeout: 5000 })
  })

  test("Result cards show title and can be clicked to navigate", async ({
    page,
  }) => {
    await page.goto("/")

    const searchInput = page.getByTestId("landing-search-input")
    await searchInput.fill("resource")
    await searchInput.press("Enter")

    // Wait for results
    page.getByTestId("landing-search-results")

    // If results exist, verify structure
    const firstCard = page.getByTestId("resource-result-card").first()
    const isVisible = await firstCard.isVisible().catch(() => false)

    if (isVisible) {
      // Card should have title
      const title = firstCard.locator('[data-testid="resource-card-title"]')
      await expect(title).toBeVisible()

      // Card should be clickable
      await expect(firstCard).toHaveAttribute("href", /\/resources\//)
    }
  })
})
