import { expect, test } from "@playwright/test"

// Fresh storage state (signed out)
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("Landing Chat Gating - Signed Out", () => {
  test("Chat section shows sign-in prompt for anonymous users", async ({
    page,
  }) => {
    await page.goto("/")

    // Look for the chat section or sign-in CTA
    const chatSection = page.getByTestId("landing-chat-section")
    await expect(chatSection).toBeVisible()

    // Should show sign-in prompt, not the chat input
    const signInCTA = page.getByTestId("chat-signin-cta")
    await expect(signInCTA).toBeVisible()
    await expect(signInCTA).toContainText(/sign in|log in/i)

    // Chat input should NOT be visible for signed-out users
    const chatInput = page.getByTestId("landing-chat-input")
    await expect(chatInput).not.toBeVisible()
  })

  test("Sign-in CTA links to login page", async ({ page }) => {
    await page.goto("/")

    const signInCTA = page.getByTestId("chat-signin-cta")
    await expect(signInCTA).toBeVisible()

    // Click the sign-in link
    const signInLink = signInCTA.getByRole("link")
    await signInLink.click()

    // Should navigate to login page
    await expect(page).toHaveURL(/\/login/)
  })

  test("Chat section mentions chat feature availability", async ({ page }) => {
    await page.goto("/")

    const chatSection = page.getByTestId("landing-chat-section")
    await expect(chatSection).toBeVisible()

    // Should mention AI chat or assistant
    await expect(chatSection).toContainText(/chat|assistant|recommendation|ai/i)
  })
})
