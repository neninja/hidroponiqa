import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("Navegação", async ({ page }) => {
  await page.goto("/admin");
  await page.getByRole("link", { name: "Textos" }).click();
  await page.waitForLoadState();

  await page.getByRole("link", { name: "The Fox and the Grapes" }).click();
  await page.waitForLoadState();

  await page.getByRole("heading", { name: "Editar Texto" }).click();
  await expect(page).toHaveScreenshot("text.png");
});

test("Formulário", async ({ page }) => {
  await page.goto("/admin/texts/51882430-4ac9-3eab-b903-f91b3bb5656e/edit");

  expect(page.getByLabel("Título")).toHaveValue("The Fox and the Grapes");
  expect(page.getByLabel("Idioma")).toContainText("Inglês");
  expect(page.getByLabel("Ativo")).toBeChecked();

  await page.getByText("One hot summer's day a Fox").isVisible();
  await page.getByText("Num dia quente de verão, um").isVisible();
});

test("Alterações básicas", async ({ page }) => {
  await page.goto("/admin/texts/51882430-4ac9-3eab-b903-f91b3bb5656e/edit");

  const newTitle = faker.word.words();
  await page.getByLabel("Título").fill(newTitle);
  await page.getByRole("button", { name: "Salvar alterações" }).click();

  await page.goto("/admin/texts/51882430-4ac9-3eab-b903-f91b3bb5656e/edit");
  expect(page.getByLabel("Título")).toHaveValue(newTitle);
});
