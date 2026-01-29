/**
 * Playwright tests for WeChat callback - US2: Clear error states with retry path
 *
 * Tests verify:
 * 1. Missing code shows clear error message and retry button
 * 2. Missing state shows clear error message and retry button
 * 3. Invalid/expired code from backend shows actionable message
 * 4. Retry navigation works correctly
 */

import { expect, test } from "@playwright/test"

// Fresh storage state (signed out)
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("WeChat Callback - US2 Error Handling", () => {
  test("Missing code parameter shows clear error", async ({ page }) => {
    // Navigate to callback with missing code
    await page.goto("/wechat-callback?state=test_state")

    // Should show error state immediately
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Should show specific missing code message
    await expect(
      page.getByText(/missing|缺少|authorization code|授权码/i),
    ).toBeVisible()

    // Retry button should be visible
    const retryButton = page.getByRole("button", { name: /try again|重试/i })
    await expect(retryButton).toBeVisible()

    // Home button should also be visible
    const homeButton = page.getByRole("button", { name: /home|首页/i })
    await expect(homeButton).toBeVisible()
  })

  test("Missing state parameter shows clear error", async ({ page }) => {
    // Navigate to callback with missing state
    await page.goto("/wechat-callback?code=test_code")

    // Should show error state
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Should show specific missing state message
    await expect(
      page.getByText(/missing|缺少|session|token|会话|令牌/i),
    ).toBeVisible()

    // Retry button should be visible
    const retryButton = page.getByRole("button", { name: /try again|重试/i })
    await expect(retryButton).toBeVisible()
  })

  test("Missing both code and state shows error", async ({ page }) => {
    // Navigate to callback with no params
    await page.goto("/wechat-callback")

    // Should show error state
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Retry and home buttons should be visible
    await expect(
      page.getByRole("button", { name: /try again|重试/i }),
    ).toBeVisible()
    await expect(page.getByRole("button", { name: /home|首页/i })).toBeVisible()
  })

  test("Retry button navigates to login page for login flow", async ({
    page,
  }) => {
    // Navigate to callback with missing code (login flow)
    await page.goto("/wechat-callback?state=test_state&action=login")

    // Wait for error state
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Click retry button
    await page.getByRole("button", { name: /try again|重试/i }).click()

    // Should navigate to login page
    await expect(page).toHaveURL(/\/login/)
  })

  test("Retry button navigates to settings page for link flow", async ({
    page,
  }) => {
    // Navigate to callback with missing code (link flow)
    await page.goto("/wechat-callback?state=test_state&action=link")

    // Wait for error state
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Click retry button
    await page.getByRole("button", { name: /try again|重试/i }).click()

    // Should navigate to settings page
    await expect(page).toHaveURL(/\/settings/)
  })

  test("Invalid code error from backend shows actionable message", async ({
    page,
  }) => {
    // Mock backend to return invalid_code error
    await page.route("**/api/v1/login/wechat/complete", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          detail: "WeChat login failed: invalid_code",
        }),
      })
    })

    // Navigate to callback with code and state
    await page.goto("/wechat-callback?code=expired_code&state=test_state")

    // Should show error state
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Should show code-related error message
    await expect(
      page.getByText(/code|授权码|expired|invalid|过期|无效/i),
    ).toBeVisible()

    // Retry button should be visible
    await expect(
      page.getByRole("button", { name: /try again|重试/i }),
    ).toBeVisible()
  })

  test("State error from backend shows actionable message", async ({
    page,
  }) => {
    // Mock backend to return state error
    await page.route("**/api/v1/login/wechat/complete", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          detail: "Invalid state token",
        }),
      })
    })

    // Navigate to callback
    await page.goto("/wechat-callback?code=test_code&state=invalid_state")

    // Should show error state
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Should show state-related error message
    await expect(
      page.getByText(/session|state|会话|过期|expired|invalid/i),
    ).toBeVisible()
  })

  test("Home button navigates to home page", async ({ page }) => {
    // Navigate to callback with error
    await page.goto("/wechat-callback")

    // Wait for error state
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Click home button
    await page.getByRole("button", { name: /home|首页/i }).click()

    // Should navigate to home page
    await expect(page).toHaveURL("/")
  })

  test("Provider unavailable error shows appropriate message", async ({
    page,
  }) => {
    // Mock backend to return 502 (provider unavailable)
    await page.route("**/api/v1/login/wechat/complete", async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({
          detail: "WeChat service unavailable",
        }),
      })
    })

    // Navigate to callback
    await page.goto("/wechat-callback?code=test_code&state=test_state")

    // Should show error state
    await expect(page.getByText(/error|错误|failed|失败/i)).toBeVisible({
      timeout: 5000,
    })

    // Should show provider unavailable message
    await expect(
      page.getByText(/unavailable|不可用|service|服务/i),
    ).toBeVisible()
  })
})
