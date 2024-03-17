//import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("Happy path", async ({ page }) => {
  page.setViewportSize({ width: 1366, height: 1024 });
  await page.goto("/admin");
  await page.getByRole("link", { name: "Textos" }).click();
  await page.waitForLoadState();

  await page.getByRole("heading", { name: "Textos" }).click();
  await expect(page).toHaveScreenshot("texts.png");
});
