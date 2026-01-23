import { expect, test } from "@playwright/test"

/**
 * E2E tests for link handling in the Markdown editor and renderer.
 *
 * User Story 2: Add links and verify appearance before submitting (Priority: P2)
 *
 * Tests verify:
 * - Links can be inserted via toolbar
 * - Links render correctly in preview
 * - Safe links open in new tab/window with proper rel attribute
 * - Unsafe URLs (javascript:, data:, etc.) are not rendered as clickable links
 * - Malformed URLs are handled gracefully
 */

test.describe("Submissions Markdown Editor - US2 Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/submissions/new")
    await page.waitForSelector("[data-color-mode]", { timeout: 10000 })
  })

  test("Link toolbar button is available", async ({ page }) => {
    // Check that the link button exists in toolbar
    const linkButton = page.locator(
      '.w-md-editor-toolbar button[data-name="link"]',
    )
    await expect(linkButton).toBeVisible()
  })

  test("Can insert link using toolbar", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("click here")

    // Select the text
    await textarea.selectText()

    // Click the link button
    const linkButton = page.locator(
      '.w-md-editor-toolbar button[data-name="link"]',
    )
    await linkButton.click()

    // Check that link Markdown syntax was inserted
    const value = await textarea.inputValue()
    expect(value).toMatch(/\[.*\]\(.*\)/)
  })

  test("Links in preview open in new tab with proper attributes", async ({
    page,
  }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("[Example Link](https://example.com)")

    // Switch to preview mode
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    // Wait for preview to render
    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // Find the link in preview
    const link = page.locator(".w-md-editor-preview a")
    await expect(link).toBeVisible()

    // Verify link attributes
    await expect(link).toHaveAttribute("target", "_blank")
    await expect(link).toHaveAttribute("rel", /noopener/)
    await expect(link).toHaveAttribute("href", "https://example.com")
  })

  test("Safe URLs render as clickable links", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()

    const safeLinks = `
[HTTP Link](http://example.com)
[HTTPS Link](https://example.com)
[Email Link](mailto:test@example.com)
`
    await textarea.fill(safeLinks)

    // Switch to preview
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // All safe links should be rendered as anchor tags
    const links = page.locator(".w-md-editor-preview a")
    await expect(links).toHaveCount(3)
  })

  test("Unsafe javascript: URLs are NOT rendered as clickable links", async ({
    page,
  }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("[Malicious Link](javascript:alert('XSS'))")

    // Switch to preview
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // The javascript: link should NOT be rendered as an anchor tag
    const unsafeLink = page.locator(
      ".w-md-editor-preview a[href^='javascript:']",
    )
    await expect(unsafeLink).toHaveCount(0)

    // Instead, it should be plain text or span
    const preview = page.locator(".w-md-editor-preview")
    await expect(preview).toContainText("Malicious Link")
  })

  test("Unsafe data: URLs are NOT rendered as clickable links", async ({
    page,
  }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("[Data Link](data:text/html,<script>alert(1)</script>)")

    // Switch to preview
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // The data: link should NOT be rendered as an anchor tag
    const unsafeLink = page.locator(".w-md-editor-preview a[href^='data:']")
    await expect(unsafeLink).toHaveCount(0)
  })

  test("Malformed URLs are handled gracefully", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("[Broken Link](not-a-valid-url)")

    // Switch to preview
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // The preview should still show the text without errors
    const preview = page.locator(".w-md-editor-preview")
    await expect(preview).toContainText("Broken Link")

    // The page should not have JavaScript errors (no crash)
    // If there were errors, the test would fail
  })
})
