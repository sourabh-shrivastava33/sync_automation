import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Homepage", () => {
  test("should load the homepage and have correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Sync Automations/);
    await expect(page.locator("h1")).toContainText("REVENUE LEAKAGE");
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/");

    // Test the page for accessibility using axe-core
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("contact form should submit", async ({ page }) => {
    await page.goto("/");

    // Use the contact form (mocking the API response since it's E2E and Next server handles it)
    await page.fill('input[name="name"]', "E2E Test User");
    await page.fill('input[name="email"]', "e2e@test.com");
    await page.fill(
      'textarea[name="message"]',
      "Hello from Playwright E2E test!",
    );

    // We expect an alert when submitted
    page.on("dialog", (dialog) => dialog.accept());

    await page.click('button:has-text("Send Message")');
  });
});
