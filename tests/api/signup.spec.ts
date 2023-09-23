import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test.skip("Happy path", async ({ page }) => {
  page.setViewportSize({ width: 1366, height: 1024 });
  await page.goto("/api/signup");
  await expect(page).toHaveScreenshot("signup-index.png");

  await page.locator("role=radio[name=/conta pessoal/i]").check();
  await expect(page).toHaveScreenshot("signup-person-index-selected.png", {
    threshold: 0.1,
  });
  await page.locator("role=button[name=/continuar/i]").click();
  await expect(page).toHaveScreenshot("signup-person-form.png", {
    threshold: 0.1,
  });

  await page
    .locator("role=textbox[name=/nome completo/i]")
    .fill(faker.name.fullName());
  await page.locator("role=textbox[name=/cpf/i]").fill("50061556041");
  await page
    .locator("role=textbox[name=/data de nascimento/i]")
    .fill("1990-10-15");
  await page
    .locator("role=textbox[name=/email/i]")
    .fill(faker.internet.exampleEmail());
  await page
    .locator("role=textbox[name=/nome da mãe/i]")
    .fill(faker.name.fullName());

  await page.locator("role=button[name=/continuar/i]").click();
  await expect(page).toHaveScreenshot("signup-person-instructions.png", {
    threshold: 0.1,
  });
});
