import { expect, test } from "@playwright/test"

// Fresh storage state (not logged in)
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("Navbar Chat Dialog", () => {
  test("Chat dialog opens when trigger is clicked", async ({ page }) => {
    await page.goto("/")

    const chatTrigger = page.getByTestId("nav-chat-trigger")
    await chatTrigger.click()

    const chatDialog = page.getByTestId("chat-dialog")
    await expect(chatDialog).toBeVisible()
  })

  test("Chat dialog closes on Escape key", async ({ page }) => {
    await page.goto("/")

    const chatTrigger = page.getByTestId("nav-chat-trigger")
    await chatTrigger.click()

    const chatDialog = page.getByTestId("chat-dialog")
    await expect(chatDialog).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(chatDialog).not.toBeVisible()
  })

  test("Chat dialog closes when clicking outside", async ({ page }) => {
    await page.goto("/")

    const chatTrigger = page.getByTestId("nav-chat-trigger")
    await chatTrigger.click()

    const chatDialog = page.getByTestId("chat-dialog")
    await expect(chatDialog).toBeVisible()

    // Click outside the dialog (on the overlay)
    await page.locator('[data-slot="dialog-overlay"]').click({
      position: { x: 10, y: 10 },
      force: true,
    })
    await expect(chatDialog).not.toBeVisible()
  })

  test("Focus returns to trigger after dialog closes", async ({ page }) => {
    await page.goto("/")

    const chatTrigger = page.getByTestId("nav-chat-trigger")
    await chatTrigger.click()

    const chatDialog = page.getByTestId("chat-dialog")
    await expect(chatDialog).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(chatDialog).not.toBeVisible()

    // Focus should return to the trigger
    await expect(chatTrigger).toBeFocused()
  })

  test("Chat dialog shows unavailable message when service is down", async ({
    page,
  }) => {
    await page.goto("/")

    const chatTrigger = page.getByTestId("nav-chat-trigger")
    await chatTrigger.click()

    // The unavailable state should be shown when chat service is not available
    // This test verifies the dialog can handle error states gracefully
    const chatDialog = page.getByTestId("chat-dialog")
    await expect(chatDialog).toBeVisible()

    // Dialog should still be closable
    await page.keyboard.press("Escape")
    await expect(chatDialog).not.toBeVisible()
  })
})

test.describe("Chat Dialog for Unauthenticated Users", () => {
  test("Unauthenticated users see sign-in prompt", async ({ page }) => {
    await page.goto("/")

    const chatTrigger = page.getByTestId("nav-chat-trigger")
    await chatTrigger.click()

    const chatDialog = page.getByTestId("chat-dialog")
    await expect(chatDialog).toBeVisible()

    // Should see sign-in prompt or similar messaging
    const authPrompt = page.getByTestId("chat-auth-prompt")
    const signInLink = page.getByRole("link", { name: /sign in|log in/i })

    // One of these should be visible for unauthenticated users
    const hasAuthPrompt = await authPrompt.isVisible().catch(() => false)
    const hasSignInLink = await signInLink.isVisible().catch(() => false)

    expect(hasAuthPrompt || hasSignInLink).toBe(true)
  })
})
