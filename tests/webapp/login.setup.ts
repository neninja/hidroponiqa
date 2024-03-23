import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/auth/webapp-student.json";

setup("Webapp student login", async ({ page }) => {
  await page.goto("/app/login");
  await expect(page).toHaveScreenshot("login.png");

  await page.getByLabel("E-mail").fill("qa_student@hidroponi.ca");
  await page.getByLabel("Senha").fill("123");

  await page.getByRole("button", { name: "Acessar" }).click();
  await page.waitForLoadState();
  await expect(page).toHaveURL("/app/texts");
  await expect(page).toHaveScreenshot("texts.png");

  await page.context().storageState({ path: authFile });
});
