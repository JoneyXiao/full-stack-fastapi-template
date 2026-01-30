import { expect, test } from "@playwright/test"

const authFile = "playwright/.auth/user.json"

test.describe("WeChat Settings No Redirect", () => {
  test.use({ storageState: authFile })

  test.beforeEach(async ({ page }) => {
    await page.route("**/api/v1/users/me/wechat", (route) =>
      route.fulfill({
        status: 403,
        contentType: "application/json",
        body: JSON.stringify({ detail: "WeChat login is not enabled" }),
      }),
    )
  })

  test("accessing settings page does not redirect when WeChat is disabled", async ({
    page,
  }) => {
    await page.goto("/settings")

    await expect(page).toHaveURL(/\/settings/)
    await expect(page.getByText("User Information")).toBeVisible()
    await expect(page.getByTestId("wechat-connection-section")).toBeVisible()

    // Ensure no delayed redirect occurs
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/\/settings/)
  })
})
