/**
 * Playwright tests for WeChat callback - US1: Login/Link flow with safe redirects
 *
 * Tests verify:
 * 1. Callback route handles `from` param and redirects to allowlisted paths
 * 2. Invalid/malicious `from` values fall back to safe defaults
 * 3. Login flow redirects to correct destination
 * 4. Link flow redirects to settings
 */

import { expect, test } from "@playwright/test"

// Fresh storage state (signed out)
test.use({ storageState: { cookies: [], origins: [] } })

test.describe("WeChat Callback - US1 Safe Redirects", () => {
  test("Login callback with valid from param redirects to allowlisted path", async ({
    page,
  }) => {
    // Mock the wechat/complete endpoint to return a valid token
    await page.route("**/api/v1/login/wechat/complete", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "mock_access_token_for_test",
          token_type: "bearer",
        }),
      })
    })

    // Mock the /users/me endpoint for post-login user fetch
    await page.route("**/api/v1/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "test-user-id",
          email: "test@example.com",
          full_name: "Test User",
          is_active: true,
          is_superuser: false,
        }),
      })
    })

    // Navigate to callback with from=/dashboard (allowlisted)
    await page.goto(
      "/wechat-callback?code=test_auth_code&state=test_state&action=login&from=/dashboard",
    )

    // Should show success state
    await expect(page.getByText(/success|成功/i)).toBeVisible({
      timeout: 5000,
    })

    // Should redirect to /dashboard after success
    await page.waitForURL("**/dashboard", { timeout: 10000 })
  })

  test("Login callback with invalid from param falls back to root", async ({
    page,
  }) => {
    // Mock successful login
    await page.route("**/api/v1/login/wechat/complete", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "mock_access_token",
          token_type: "bearer",
        }),
      })
    })

    await page.route("**/api/v1/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "test-user-id",
          email: "test@example.com",
          full_name: "Test User",
          is_active: true,
          is_superuser: false,
        }),
      })
    })

    // Navigate with malicious from param (full URL - should be rejected)
    await page.goto(
      "/wechat-callback?code=test_code&state=test_state&action=login&from=https://evil.com/steal",
    )

    // Should show success
    await expect(page.getByText(/success|成功/i)).toBeVisible({
      timeout: 5000,
    })

    // Should NOT redirect to evil.com, should go to root instead
    await page.waitForURL(/^(?!.*evil\.com).*$/, { timeout: 10000 })
    const url = page.url()
    expect(url).not.toContain("evil.com")
  })

  test("Login callback with non-allowlisted from param falls back to root", async ({
    page,
  }) => {
    // Mock successful login
    await page.route("**/api/v1/login/wechat/complete", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          access_token: "mock_access_token",
          token_type: "bearer",
        }),
      })
    })

    await page.route("**/api/v1/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "test-user-id",
          email: "test@example.com",
          full_name: "Test User",
          is_active: true,
          is_superuser: false,
        }),
      })
    })

    // Navigate with non-allowlisted path
    await page.goto(
      "/wechat-callback?code=test_code&state=test_state&action=login&from=/some-unknown-path",
    )

    // Should show success
    await expect(page.getByText(/success|成功/i)).toBeVisible({
      timeout: 5000,
    })

    // Should fall back to root (/) not the unknown path
    await page.waitForURL("/", { timeout: 10000 })
  })

  test("Link callback redirects to settings on success", async ({ page }) => {
    // Mock successful link
    await page.route("**/api/v1/users/me/wechat/link", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "link-id",
          openid: "test_openid",
          unionid: "test_unionid",
          nickname: "Test WeChat User",
        }),
      })
    })

    // Mock user fetch
    await page.route("**/api/v1/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "test-user-id",
          email: "test@example.com",
          full_name: "Test User",
          is_active: true,
          is_superuser: false,
        }),
      })
    })

    // Mock WeChat link status
    await page.route("**/api/v1/users/me/wechat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "link-id",
          openid: "test_openid",
          nickname: "Test WeChat User",
        }),
      })
    })

    // Navigate to callback with action=link
    await page.goto(
      "/wechat-callback?code=test_code&state=test_state&action=link",
    )

    // Should show success state
    await expect(page.getByText(/success|成功/i)).toBeVisible({
      timeout: 5000,
    })

    // Should redirect to settings
    await page.waitForURL("**/settings", { timeout: 10000 })
  })

  test("Link callback with from=/settings redirects correctly", async ({
    page,
  }) => {
    // Mock successful link
    await page.route("**/api/v1/users/me/wechat/link", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "link-id",
          openid: "test_openid",
          unionid: "test_unionid",
          nickname: "Test WeChat User",
        }),
      })
    })

    await page.route("**/api/v1/users/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "test-user-id",
          email: "test@example.com",
          full_name: "Test User",
          is_active: true,
          is_superuser: false,
        }),
      })
    })

    await page.route("**/api/v1/users/me/wechat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "link-id",
          openid: "test_openid",
          nickname: "Test WeChat User",
        }),
      })
    })

    // Navigate with explicit from=/settings
    await page.goto(
      "/wechat-callback?code=test_code&state=test_state&action=link&from=/settings",
    )

    // Should show success
    await expect(page.getByText(/success|成功/i)).toBeVisible({
      timeout: 5000,
    })

    // Should redirect to settings
    await page.waitForURL("**/settings", { timeout: 10000 })
  })
})
