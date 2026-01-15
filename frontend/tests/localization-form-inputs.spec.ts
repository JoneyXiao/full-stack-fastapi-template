import { expect, test } from "@playwright/test"

// Fresh storage state (not logged in) to test auth pages
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("Form input preservation during locale switch (FR-009)", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure clean state
    await page.goto("/login")
    await page.evaluate(() => localStorage.clear())
  })

  test("Login form input values are preserved when switching locale", async ({
    page,
  }) => {
    await page.goto("/login")

    // Fill in the form
    const testEmail = "test@example.com"
    const testPassword = "testpassword123"

    await page.getByTestId("email-input").fill(testEmail)
    await page.getByTestId("password-input").fill(testPassword)

    // Verify values are filled
    await expect(page.getByTestId("email-input")).toHaveValue(testEmail)
    await expect(page.getByTestId("password-input")).toHaveValue(testPassword)

    // Switch locale to Chinese
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify input values are still preserved
    await expect(page.getByTestId("email-input")).toHaveValue(testEmail)
    await expect(page.getByTestId("password-input")).toHaveValue(testPassword)

    // Switch back to English
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /English/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify input values are still preserved
    await expect(page.getByTestId("email-input")).toHaveValue(testEmail)
    await expect(page.getByTestId("password-input")).toHaveValue(testPassword)
  })

  test("Signup form input values are preserved when switching locale", async ({
    page,
  }) => {
    await page.goto("/signup")

    // Fill in the form
    const testName = "Test User"
    const testEmail = "test@example.com"
    const testPassword = "testpassword123"

    await page.getByTestId("full-name-input").fill(testName)
    await page.getByTestId("email-input").fill(testEmail)
    await page.getByTestId("password-input").fill(testPassword)
    await page.getByTestId("confirm-password-input").fill(testPassword)

    // Verify values are filled
    await expect(page.getByTestId("full-name-input")).toHaveValue(testName)
    await expect(page.getByTestId("email-input")).toHaveValue(testEmail)
    await expect(page.getByTestId("password-input")).toHaveValue(testPassword)
    await expect(page.getByTestId("confirm-password-input")).toHaveValue(
      testPassword,
    )

    // Switch locale to Chinese
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify all input values are still preserved
    await expect(page.getByTestId("full-name-input")).toHaveValue(testName)
    await expect(page.getByTestId("email-input")).toHaveValue(testEmail)
    await expect(page.getByTestId("password-input")).toHaveValue(testPassword)
    await expect(page.getByTestId("confirm-password-input")).toHaveValue(
      testPassword,
    )
  })

  test("Recover password form input is preserved when switching locale", async ({
    page,
  }) => {
    await page.goto("/recover-password")

    // Fill in the form
    const testEmail = "test@example.com"

    await page.getByTestId("email-input").fill(testEmail)

    // Verify value is filled
    await expect(page.getByTestId("email-input")).toHaveValue(testEmail)

    // Switch locale to Chinese
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify input value is still preserved
    await expect(page.getByTestId("email-input")).toHaveValue(testEmail)
  })

  test("Reset password form input values are preserved when switching locale", async ({
    page,
  }) => {
    // Reset password page requires a token parameter
    await page.goto("/reset-password?token=test-token")

    // Fill in the form
    const testPassword = "newpassword123"

    await page.getByTestId("password-input").fill(testPassword)
    await page.getByTestId("confirm-password-input").fill(testPassword)

    // Verify values are filled
    await expect(page.getByTestId("password-input")).toHaveValue(testPassword)
    await expect(page.getByTestId("confirm-password-input")).toHaveValue(
      testPassword,
    )

    // Switch locale to Chinese
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify input values are still preserved
    await expect(page.getByTestId("password-input")).toHaveValue(testPassword)
    await expect(page.getByTestId("confirm-password-input")).toHaveValue(
      testPassword,
    )
  })

  test("Form validation state is preserved when switching locale", async ({
    page,
  }) => {
    await page.goto("/login")

    // Fill with invalid email to trigger validation
    await page.getByTestId("email-input").fill("invalid-email")
    await page.getByTestId("password-input").fill("short")

    // Try to submit to trigger validation
    await page.getByRole("button", { name: "Log In" }).click()

    // Wait for validation messages
    await page.waitForTimeout(100)

    // The input values should remain
    await expect(page.getByTestId("email-input")).toHaveValue("invalid-email")
    await expect(page.getByTestId("password-input")).toHaveValue("short")

    // Switch locale to Chinese
    const localeSwitcher = page.getByTestId("auth-locale-switcher")
    await localeSwitcher.click()
    await page.getByRole("menuitem", { name: /中文/i }).click()

    // Wait for UI to update
    await page.waitForTimeout(100)

    // Verify input values are preserved even with validation state
    await expect(page.getByTestId("email-input")).toHaveValue("invalid-email")
    await expect(page.getByTestId("password-input")).toHaveValue("short")
  })

  test("Multiple rapid locale switches preserve form input values", async ({
    page,
  }) => {
    await page.goto("/login")

    // Fill in the form
    const testEmail = "test@example.com"
    const testPassword = "testpassword123"

    await page.getByTestId("email-input").fill(testEmail)
    await page.getByTestId("password-input").fill(testPassword)

    const localeSwitcher = page.getByTestId("auth-locale-switcher")

    // Rapidly switch locales multiple times
    for (let i = 0; i < 3; i++) {
      // Switch to Chinese
      await localeSwitcher.click()
      await page.getByRole("menuitem", { name: /中文/i }).click()
      await page.waitForTimeout(50)

      // Switch to English
      await localeSwitcher.click()
      await page.getByRole("menuitem", { name: /English/i }).click()
      await page.waitForTimeout(50)
    }

    // Verify input values are still preserved after multiple switches
    await expect(page.getByTestId("email-input")).toHaveValue(testEmail)
    await expect(page.getByTestId("password-input")).toHaveValue(testPassword)
  })
})
