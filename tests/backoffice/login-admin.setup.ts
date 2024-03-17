import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/auth/backoffice-admin.json";

setup("Backoffice admin login", async ({ page }) => {
  page.setViewportSize({ width: 1366, height: 1024 });
  await page.goto("/admin/login");
  await expect(page).toHaveScreenshot("login.png");

  await page.getByLabel("E-mail").fill("qa_admin@hidroponi.ca");
  await page.getByLabel("Senha").fill("123");

  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState();
  await expect(page).toHaveURL("/admin");
  await expect(page).toHaveScreenshot("dashboard.png");

  await page.context().storageState({ path: authFile });
});
