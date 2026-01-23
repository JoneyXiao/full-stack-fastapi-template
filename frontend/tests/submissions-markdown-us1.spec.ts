import { expect, test } from "@playwright/test"

/**
 * E2E tests for the Rich Text Editor (Markdown) feature in submissions.
 *
 * User Story 1: Write a formatted description while submitting (Priority: P1)
 *
 * Tests verify:
 * - Markdown editor is visible and functional
 * - Formatted content (bold, italics, lists) is preserved on submission
 * - Markdown rendering appears correctly on detail page
 * - Character limit is enforced
 */

test.describe("Submissions Markdown Editor - US1", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the new submission page (requires authentication via storageState)
    await page.goto("/submissions/new")
    // Wait for the page to load
    await page.waitForSelector("[data-color-mode]", { timeout: 10000 })
  })

  test("Markdown editor is visible on new submission page", async ({
    page,
  }) => {
    // Check that the Markdown editor container is visible
    const editorContainer = page.locator("[data-color-mode]")
    await expect(editorContainer).toBeVisible()

    // Check that the toolbar is present
    const toolbar = page.locator(".w-md-editor-toolbar")
    await expect(toolbar).toBeVisible()
  })

  test("Can apply bold formatting using toolbar", async ({ page }) => {
    // Focus the editor textarea
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("test text")

    // Select the text
    await textarea.selectText()

    // Click the bold button in toolbar
    const boldButton = page.locator(
      '.w-md-editor-toolbar button[data-name="bold"]',
    )
    await boldButton.click()

    // Check that the text now has bold markers
    const textareaValue = await textarea.inputValue()
    expect(textareaValue).toContain("**")
  })

  test("Can enter Markdown content directly", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()

    const markdownContent = `# Heading

This is **bold** and *italic* text.

- Item 1
- Item 2
- Item 3

[Link](https://example.com)`

    await textarea.fill(markdownContent)

    // Verify content was entered
    const value = await textarea.inputValue()
    expect(value).toContain("**bold**")
    expect(value).toContain("*italic*")
    expect(value).toContain("- Item 1")
  })

  test("Can switch to preview mode", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("**Bold text** and *italic*")

    // Click preview button
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    // Wait for preview to render
    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // Check that the preview shows rendered Markdown
    const preview = page.locator(".w-md-editor-preview")
    await expect(preview).toBeVisible()

    // The preview should contain rendered HTML (strong tag for bold)
    const strongElement = preview.locator("strong")
    await expect(strongElement).toContainText("Bold text")
  })

  test("Character count is displayed", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("Hello, World!")

    // Check that character count is displayed
    const charCount = page.locator('[aria-live="polite"]')
    await expect(charCount).toBeVisible()
    await expect(charCount).toContainText("13")
    await expect(charCount).toContainText("10000")
  })

  test("Submit button is disabled when description exceeds limit", async ({
    page,
  }) => {
    // Fill required fields
    await page.locator("#title").fill("Test Submission")
    await page.locator("#destination_url").fill("https://example.com")

    // Select a type
    await page.locator('[id="type"]').click()
    await page.getByRole("option", { name: "Tutorial" }).click()

    // Create a string exceeding 10,000 characters
    const longDescription = "x".repeat(10001)
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill(longDescription)

    // Wait for validation to trigger
    await page.waitForTimeout(100)

    // Check that the error message is shown
    const errorMessage = page.getByText(/must be 10000 characters or less/i)
    await expect(errorMessage).toBeVisible()

    // Check that submit button is disabled
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeDisabled()
  })

  test("Empty description is allowed (description is optional)", async ({
    page,
  }) => {
    // Fill required fields only, leave description empty
    await page.locator("#title").fill("Test Submission No Description")
    await page.locator("#destination_url").fill("https://example.com/nodesc")

    // Select a type
    await page.locator('[id="type"]').click()
    await page.getByRole("option", { name: "Tool" }).click()

    // Submit button should be enabled
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeEnabled()
  })

  test("XSS: Script tags in description are NOT executed", async ({ page }) => {
    // This is a critical XSS regression test
    const xssPayload = `<script>window.xssExecuted = true;</script>

Normal text after script tag.

<img src="x" onerror="window.xssExecuted = true;">

More text.`

    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill(xssPayload)

    // Switch to preview mode
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // Check that the script was NOT executed
    const xssExecuted = await page.evaluate(() => {
      // @ts-expect-error - checking for XSS injection
      return window.xssExecuted === true
    })
    expect(xssExecuted).toBe(false)

    // The preview should still show the text content (escaped)
    const preview = page.locator(".w-md-editor-preview")
    await expect(preview).toContainText("Normal text after script tag")
    await expect(preview).toContainText("More text")

    // The script tag should be displayed as escaped text, not executed
    // In the preview, the raw HTML should be visible but not rendered
  })
})
