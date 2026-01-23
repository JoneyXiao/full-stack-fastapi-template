import { expect, test } from "@playwright/test"

/**
 * E2E tests for image handling in the Markdown editor and renderer.
 *
 * User Story 3: Include images in descriptions safely (Priority: P3)
 *
 * Tests verify:
 * - Images can be inserted via toolbar or Markdown syntax
 * - Valid image URLs render correctly with lazy loading
 * - Broken/invalid images degrade gracefully with visible fallback
 * - Unsafe image URLs (javascript:, data:) are blocked
 * - Page remains usable even with broken images
 */

test.describe("Submissions Markdown Editor - US3 Images", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/submissions/new")
    await page.waitForSelector("[data-color-mode]", { timeout: 10000 })
  })

  test("Image toolbar button is available", async ({ page }) => {
    // Check that the image button exists in toolbar
    const imageButton = page.locator(
      '.w-md-editor-toolbar button[data-name="image"]',
    )
    await expect(imageButton).toBeVisible()
  })

  test("Can insert image using Markdown syntax", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("![Alt text](https://example.com/image.png)")

    // Verify content was entered correctly
    const value = await textarea.inputValue()
    expect(value).toContain("![Alt text]")
    expect(value).toContain("https://example.com/image.png")
  })

  test("Valid image renders in preview with lazy loading", async ({ page }) => {
    // Using a placeholder image that should load
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill(
      "![Test Image](https://via.placeholder.com/150/0000FF/808080?text=Test)",
    )

    // Switch to preview mode
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // Find the image in preview
    const image = page.locator(".w-md-editor-preview img")
    await expect(image).toBeVisible()

    // Verify lazy loading attribute
    await expect(image).toHaveAttribute("loading", "lazy")
  })

  test("Broken image shows fallback instead of broken image icon", async ({
    page,
  }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill(
      "![Broken Image](https://nonexistent-domain-12345.com/image.png)",
    )

    // Switch to preview mode
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // Wait for image error to trigger fallback
    // The fallback should contain the alt text
    await page.waitForTimeout(2000) // Allow time for image error

    // The preview should still be visible and usable
    const preview = page.locator(".w-md-editor-preview")
    await expect(preview).toBeVisible()

    // Either the image or the fallback should be present
    // (test should not crash the page)
    await expect(preview).toContainText("Broken Image")
  })

  test("Unsafe javascript: image URLs are blocked", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill("![XSS](javascript:alert('XSS'))")

    // Switch to preview mode
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // The javascript: image should NOT be rendered as an img tag with that src
    const unsafeImg = page.locator(
      ".w-md-editor-preview img[src^='javascript:']",
    )
    await expect(unsafeImg).toHaveCount(0)

    // Instead, a fallback should be shown
    const preview = page.locator(".w-md-editor-preview")
    await expect(preview).toContainText("XSS")
  })

  test("Unsafe data: image URLs are blocked", async ({ page }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()
    await textarea.fill(
      "![Data Image](data:text/html,<script>alert(1)</script>)",
    )

    // Switch to preview mode
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // The data: image should NOT be rendered as an img tag with that src
    const unsafeImg = page.locator(".w-md-editor-preview img[src^='data:']")
    await expect(unsafeImg).toHaveCount(0)
  })

  test("Multiple images with mixed validity do not crash the page", async ({
    page,
  }) => {
    const textarea = page.locator(".w-md-editor-text-input")
    await textarea.click()

    const content = `
# Images Test

Valid image:
![Valid](https://via.placeholder.com/100)

Broken image:
![Broken](https://nonexistent-12345.com/broken.png)

Unsafe image:
![Unsafe](javascript:void(0))

More text after images.
`
    await textarea.fill(content)

    // Switch to preview mode
    const previewButton = page.locator(
      '.w-md-editor-toolbar button[data-name="preview"]',
    )
    await previewButton.click()

    await page.waitForSelector(".w-md-editor-preview", { timeout: 5000 })

    // The page should still be functional
    const preview = page.locator(".w-md-editor-preview")
    await expect(preview).toBeVisible()
    await expect(preview).toContainText("Images Test")
    await expect(preview).toContainText("More text after images")
  })
})
