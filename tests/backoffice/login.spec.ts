//import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("Happy path", async ({ page }) => {
  page.setViewportSize({ width: 1366, height: 1024 });
  await page.goto("/admin/login");
  await expect(page).toHaveScreenshot("login.png");

  await page.getByLabel("E-mail").fill("admin@hidroponi.ca");
  await page.getByLabel("Senha").fill("123", { maskInReport: true });

  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState();
  await expect(page).toHaveScreenshot("dashboard.png");
});
