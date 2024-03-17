import { expect, test } from "@playwright/test";

test("Ativa", async ({ page }) => {
  await page.goto("/api/reference");
  await expect(page).toHaveScreenshot("reference.png");
});
