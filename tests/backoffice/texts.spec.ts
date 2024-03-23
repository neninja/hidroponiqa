import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test.describe("Listagem", () => {
  test("Happy path", async ({ page }) => {
    await page.goto("/admin");
    await page.getByRole("link", { name: "Textos" }).click();
    await page.waitForLoadState();

    await page.getByRole("heading", { name: "Textos" }).click();

    await expect(page).toHaveScreenshot("list.png");
  });

  test("Acesso", async ({ page }) => {
    await page.goto("/admin");
    await page.getByRole("link", { name: "Textos" }).click();
    await page.waitForLoadState();

    await page.getByRole("link", { name: "The Fox and the Grapes" }).click();
    await page.waitForLoadState();

    await page.getByRole("heading", { name: "Editar Texto" }).click();
    await expect(page).toHaveScreenshot("form.png");
  });
});

test.describe("Edição", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/texts/51882430-4ac9-3eab-b903-f91b3bb5656e/edit");
  });

  test("Formulário", async ({ page }) => {
    expect(page.getByLabel("Título")).toHaveValue("The Fox and the Grapes");
    expect(page.getByLabel("Idioma")).toContainText("Inglês");
    expect(page.getByLabel("Ativo")).toBeChecked();

    await page.getByText("One hot summer's day a Fox").isVisible();
    await page.getByText("Num dia quente de verão, um").isVisible();
  });

  test("Alterações básicas", async ({ page }) => {
    const newTitle = faker.word.words();
    await page.getByLabel("Título").fill(newTitle);
    await page.getByRole("button", { name: "Salvar alterações" }).click();

    await page.goto("/admin/texts/51882430-4ac9-3eab-b903-f91b3bb5656e/edit");
    expect(page.getByLabel("Título")).toHaveValue(newTitle);
  });

  test("Upload de audio", async ({ page }) => {
    await page
      .locator("input[type='file']")
      .setInputFiles("resources/audio.mp3");

    await page.waitForLoadState("networkidle");

    expect(page.getByText("Envio finalizado")).toBeDefined();
    expect(page.getByRole("button", { name: /enviando/gi })).toBeDefined();
    await page.getByRole("button", { name: /salvar/gi }).click();

    await page.goto("/admin/texts/51882430-4ac9-3eab-b903-f91b3bb5656e/edit");
    await page.waitForLoadState("networkidle");
    expect(page.getByText("the-fox-and-the-grapes").first()).toBeVisible();
  });
});
