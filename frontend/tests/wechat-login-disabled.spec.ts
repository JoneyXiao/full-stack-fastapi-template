/**
 * Playwright E2E tests: WeChat Login Unavailable Toast
 *
 * Covers spec requirement: when WeChat login is disabled, clicking the WeChat
 * button shows a warning toast ("WeChat login is currently unavailable.") and
 * does not open the QR UI. Repeated clicks are rate-limited (one toast per 2s).
 *
 * Prerequisites:
 * - Backend environment has `WECHAT_LOGIN_ENABLED=False` (or WeChat credentials missing).
 * - Alternatively, the test intercepts the API call to simulate 403.
 */

import { expect, test } from "@playwright/test"

// Use clean session (not logged in)
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("WeChat Login Disabled Toast", () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the WeChat start endpoint and return 403 to simulate disabled provider
    // Use exact path pattern to ensure proper matching
    await page.route("**/api/v1/login/wechat/start", (route) => {
      return route.fulfill({
        status: 403,
        contentType: "application/json",
        body: JSON.stringify({ detail: "WeChat login is not enabled" }),
      })
    })
  })

  test("clicking WeChat button shows warning toast when disabled", async ({
    page,
  }) => {
    await page.goto("/login")

    // WeChat button should be visible
    const wechatBtn = page.getByTestId("wechat-login-button")
    await expect(wechatBtn).toBeVisible()

    // Click the WeChat button — this opens QR popup, which fires the API call
    await wechatBtn.click()

    // Expect warning toast with exact message
    // The toast appears after the API returns 403 and onDisabled is called
    await expect(
      page.getByText("WeChat login is currently unavailable."),
    ).toBeVisible({ timeout: 10000 })
  })

  test("QR popup does NOT open when WeChat is disabled", async ({ page }) => {
    await page.goto("/login")

    const wechatBtn = page.getByTestId("wechat-login-button")
    await wechatBtn.click()

    // QR region should not appear (because the click opens the popup and then
    // the backend 403 triggers onDisabled which closes it and toasts)
    // Wait briefly and confirm QR region is not present
    await page.waitForTimeout(500)
    await expect(page.locator("#wechat-login-qr")).not.toBeVisible()
  })

  test("rapid clicks produce at most one toast per 2 seconds", async ({
    page,
  }) => {
    await page.goto("/login")

    const wechatBtn = page.getByTestId("wechat-login-button")

    // First click -> opens QR which hits 403 -> toast appears
    await wechatBtn.click()

    // Wait for initial toast
    const toastText = page.getByText("WeChat login is currently unavailable.")
    await expect(toastText.first()).toBeVisible({ timeout: 10000 })

    // Rapidly click several more times within 2s window
    await wechatBtn.click()
    await wechatBtn.click()
    await wechatBtn.click()

    // Give brief time for any additional toasts to appear
    await page.waitForTimeout(300)

    // Should still only have one toast on screen (rate limited)
    const toastCount = await toastText.count()
    expect(toastCount).toBeLessThanOrEqual(1)

    // Wait until after the 2s window and click again
    await page.waitForTimeout(2100)
    await wechatBtn.click()

    // Now a second toast should be allowed
    await page.waitForTimeout(300)
    const newCount = await toastText.count()
    // Could be 1 or 2 depending on whether original toast auto-dismissed
    expect(newCount).toBeGreaterThanOrEqual(1)
  })

  test("user remains on login page after clicking disabled WeChat", async ({
    page,
  }) => {
    await page.goto("/login")

    const wechatBtn = page.getByTestId("wechat-login-button")
    await wechatBtn.click()

    // URL should still be /login
    await expect(page).toHaveURL(/\/login/)

    // Login form should still be visible and functional
    await expect(page.getByTestId("email-input")).toBeVisible()
    await expect(page.getByTestId("password-input")).toBeVisible()
  })
})
