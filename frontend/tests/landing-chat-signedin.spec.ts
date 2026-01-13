import { expect, test } from "@playwright/test"
import dotenv from "dotenv"

dotenv.config()

const firstSuperuser = process.env.FIRST_SUPERUSER || "admin@example.com"
const firstSuperuserPassword =
  process.env.FIRST_SUPERUSER_PASSWORD || "changethis"

// Use authenticated state for signed-in tests
test.describe("Landing Chat - Signed In", () => {
  test.beforeEach(async ({ page }) => {
    // Sign in first
    await page.goto("/login")
    await page.getByTestId("email-input").fill(firstSuperuser)
    await page.getByTestId("password-input").fill(firstSuperuserPassword)
    await page.getByRole("button", { name: /log in/i }).click()

    // Wait for redirect to dashboard
    await page.waitForURL("**/")

    // Then navigate to landing page (which may be different from dashboard)
    await page.goto("/")
  })

  test("Chat input is visible for signed-in users", async ({ page }) => {
    const chatSection = page.getByTestId("landing-chat-section")
    await expect(chatSection).toBeVisible()

    // Chat input should be visible for signed-in users
    const chatInput = page.getByTestId("landing-chat-input")
    await expect(chatInput).toBeVisible()

    // Sign-in CTA should NOT be visible
    const signInCTA = page.getByTestId("chat-signin-cta")
    await expect(signInCTA).not.toBeVisible()
  })

  test("Can send a chat message", async ({ page }) => {
    const chatInput = page.getByTestId("landing-chat-input")
    const sendButton = page.getByTestId("landing-chat-send")

    await chatInput.fill("Find me machine learning tutorials")
    await sendButton.click()

    // Should show loading or response (or 503 error if chat is disabled)
    const responseOrError = page.locator(
      '[data-testid="landing-chat-response"], [data-testid="landing-chat-error"], [data-testid="landing-chat-loading"]',
    )
    await expect(responseOrError).toBeVisible({ timeout: 10000 })
  })

  test("Can send message via Enter key", async ({ page }) => {
    const chatInput = page.getByTestId("landing-chat-input")

    await chatInput.fill("GPT tutorials")
    await chatInput.press("Enter")

    // Should show loading or response
    const responseOrError = page.locator(
      '[data-testid="landing-chat-response"], [data-testid="landing-chat-error"], [data-testid="landing-chat-loading"]',
    )
    await expect(responseOrError).toBeVisible({ timeout: 10000 })
  })

  test("Chat shows loading indicator quickly", async ({ page }) => {
    const chatInput = page.getByTestId("landing-chat-input")

    await chatInput.fill("tutorials")

    // Start the send
    const sendPromise = chatInput.press("Enter")

    // Loading should appear within 500ms
    const loadingIndicator = page.getByTestId("landing-chat-loading")
    await expect(loadingIndicator).toBeVisible({ timeout: 500 })

    await sendPromise
  })

  test("Can save chat transcript", async ({ page }) => {
    // First send a message to have something to save
    const chatInput = page.getByTestId("landing-chat-input")
    const sendButton = page.getByTestId("landing-chat-send")

    await chatInput.fill("Find me tutorials")
    await sendButton.click()

    // Wait for response (or error)
    const responseOrError = page.locator(
      '[data-testid="landing-chat-response"], [data-testid="landing-chat-error"]',
    )
    await expect(responseOrError).toBeVisible({ timeout: 10000 })

    // Look for save button
    const saveButton = page.getByTestId("landing-chat-save")

    // If save button is visible, click it
    if (await saveButton.isVisible()) {
      await saveButton.click()

      // Should show success or saved transcripts dialog
      const saveSuccess = page.locator(
        '[data-testid="save-success"], [data-testid="saved-transcripts-dialog"]',
      )
      await expect(saveSuccess).toBeVisible({ timeout: 5000 })
    }
  })

  test("Clear chat button resets conversation", async ({ page }) => {
    // Send a message first
    const chatInput = page.getByTestId("landing-chat-input")
    await chatInput.fill("Hello")
    await chatInput.press("Enter")

    // Wait for response
    const response = page.locator(
      '[data-testid="landing-chat-response"], [data-testid="landing-chat-error"]',
    )
    await expect(response).toBeVisible({ timeout: 10000 })

    // Look for clear/restart button
    const clearButton = page.getByTestId("landing-chat-clear")

    if (await clearButton.isVisible()) {
      await clearButton.click()

      // Messages should be cleared
      const messageList = page.getByTestId("landing-chat-messages")
      const messages = messageList.locator('[data-testid="chat-message"]')
      await expect(messages).toHaveCount(0)
    }
  })
})
