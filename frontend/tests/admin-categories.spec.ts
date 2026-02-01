import { expect, test } from "@playwright/test"

// Use authenticated state (superuser)
test.describe("Admin Categories Management", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the admin page and select the Categories tab
    await page.goto("/admin")
    await page.waitForURL("/admin")

    // Click on the Categories tab
    await page.getByRole("tab", { name: /categories/i }).click()

    // Wait for the categories list to load
    await page.waitForSelector("table", { timeout: 10000 }).catch(() => {
      // If no table, might be empty state - that's ok
    })
  })

  // =========================================================================
  // T026: Create and rename category tests
  // =========================================================================

  test("should display categories tab in admin panel", async ({ page }) => {
    // Verify we're on the admin page with categories tab
    await expect(page.getByRole("tab", { name: /categories/i })).toBeVisible()
  })

  test("should show create category button", async ({ page }) => {
    // The "Create Category" button should be visible
    await expect(
      page.getByRole("button", { name: /create category/i }),
    ).toBeVisible()
  })

  test("should open create category dialog", async ({ page }) => {
    // Click create button
    await page.getByRole("button", { name: /create category/i }).click()

    // Dialog should be visible
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(
      page.getByRole("heading", { name: /create category/i }),
    ).toBeVisible()

    // Name input should be visible
    await expect(page.locator("#category-name")).toBeVisible()
  })

  test("should create a new category", async ({ page }) => {
    const uniqueName = `TestCategory-${Date.now()}`

    // Click create button
    await page.getByRole("button", { name: /create category/i }).click()

    // Fill in the name
    await page.locator("#category-name").fill(uniqueName)

    // Submit the form
    await page.getByRole("button", { name: /^create$/i }).click()

    // Dialog should close
    await expect(page.getByRole("dialog")).not.toBeVisible()

    // New category should appear in the table
    await expect(page.getByText(uniqueName)).toBeVisible()
  })

  test("should show error when creating duplicate category", async ({
    page,
  }) => {
    const uniqueName = `DuplicateTest-${Date.now()}`

    // Create first category
    await page.getByRole("button", { name: /create category/i }).click()
    await page.locator("#category-name").fill(uniqueName)
    await page.getByRole("button", { name: /^create$/i }).click()

    // Wait for dialog to close
    await expect(page.getByRole("dialog")).not.toBeVisible()
    await expect(page.getByText(uniqueName)).toBeVisible()

    // Try to create duplicate
    await page.getByRole("button", { name: /create category/i }).click()
    await page.locator("#category-name").fill(uniqueName)
    await page.getByRole("button", { name: /^create$/i }).click()

    // Should show error toast (409 conflict)
    await expect(page.getByText(/already exists/i)).toBeVisible({
      timeout: 5000,
    })
  })

  test("should show error when creating case-insensitive duplicate", async ({
    page,
  }) => {
    const uniqueName = `CaseDupe-${Date.now()}`

    // Create first category in lowercase
    await page.getByRole("button", { name: /create category/i }).click()
    await page.locator("#category-name").fill(uniqueName.toLowerCase())
    await page.getByRole("button", { name: /^create$/i }).click()
    await expect(page.getByRole("dialog")).not.toBeVisible()

    // Try to create with different case
    await page.getByRole("button", { name: /create category/i }).click()
    await page.locator("#category-name").fill(uniqueName.toUpperCase())
    await page.getByRole("button", { name: /^create$/i }).click()

    // Should show error toast (409 conflict)
    await expect(page.getByText(/already exists/i)).toBeVisible({
      timeout: 5000,
    })
  })

  test("should rename a category", async ({ page }) => {
    const originalName = `RenameTest-${Date.now()}`
    const newName = `Renamed-${Date.now()}`

    // Create a category first
    await page.getByRole("button", { name: /create category/i }).click()
    await page.locator("#category-name").fill(originalName)
    await page.getByRole("button", { name: /^create$/i }).click()
    await expect(page.getByRole("dialog")).not.toBeVisible()

    // Find the row with the category and click edit
    const row = page.locator("tr", { has: page.getByText(originalName) })
    await row.getByRole("button", { name: /edit/i }).click()

    // Edit dialog should open
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(
      page.getByRole("heading", { name: /rename category/i }),
    ).toBeVisible()

    // Change the name
    await page.locator("#edit-category-name").clear()
    await page.locator("#edit-category-name").fill(newName)

    // Save
    await page.getByRole("button", { name: /^save$/i }).click()

    // Dialog should close
    await expect(page.getByRole("dialog")).not.toBeVisible()

    // New name should appear, old name should be gone
    await expect(page.getByText(newName)).toBeVisible()
    await expect(page.getByText(originalName)).not.toBeVisible()
  })

  // =========================================================================
  // T034: Delete category tests
  // =========================================================================

  test("should delete an unused category", async ({ page }) => {
    const categoryName = `DeleteTest-${Date.now()}`

    // Create a category first
    await page.getByRole("button", { name: /create category/i }).click()
    await page.locator("#category-name").fill(categoryName)
    await page.getByRole("button", { name: /^create$/i }).click()
    await expect(page.getByRole("dialog")).not.toBeVisible()
    await expect(page.getByText(categoryName)).toBeVisible()

    // Find the row and click delete
    const row = page.locator("tr", { has: page.getByText(categoryName) })
    await row.getByRole("button", { name: /delete/i }).click()

    // Confirmation dialog should appear
    await expect(page.getByRole("alertdialog")).toBeVisible()
    await expect(
      page.getByText(/are you sure you want to delete/i),
    ).toBeVisible()

    // Confirm deletion
    await page.getByRole("button", { name: /^delete$/i }).click()

    // Category should be removed from the list
    await expect(page.getByText(categoryName)).not.toBeVisible()
  })

  test("should show disabled delete button for in-use category", async ({
    page,
  }) => {
    // Navigate to admin and find a category that's in use
    // (Categories with resources_count > 0 or submissions_count > 0 have in_use=true)

    // Look for a category row that shows "In Use" badge
    const inUseRow = page.locator("tr").filter({
      has: page.locator('text="In Use"'),
    })

    // If we have an in-use category, the delete button should be disabled
    const inUseRowCount = await inUseRow.count()
    if (inUseRowCount > 0) {
      const deleteButton = inUseRow
        .first()
        .getByRole("button", { name: /delete/i })
      await expect(deleteButton).toBeDisabled()
    } else {
      // If no in-use categories, skip this test
      test.skip()
    }
  })

  test("should display usage counts in category table", async ({ page }) => {
    // The table should have columns for Resources and Submissions counts
    await expect(
      page.getByRole("columnheader", { name: /resources/i }),
    ).toBeVisible()
    await expect(
      page.getByRole("columnheader", { name: /submissions/i }),
    ).toBeVisible()
    await expect(
      page.getByRole("columnheader", { name: /status/i }),
    ).toBeVisible()
  })
})
