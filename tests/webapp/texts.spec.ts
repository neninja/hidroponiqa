import { expect, test } from "@playwright/test";

test.describe("Listagem", () => {
  test("Acesso", async ({ page }) => {
    await page.goto("/app/texts");
    await expect(page).toHaveScreenshot("list.png");

    await page.getByRole("link", { name: "The Fox and the Grapes" }).click();
    await page.waitForLoadState();

    const audio = page.locator("audio");
    await expect(page).toHaveScreenshot("detail.png", {
      mask: [audio],
    });
  });
});
