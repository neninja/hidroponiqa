import { expect, test } from "./fixture";

test("list texts", async ({ api }) => {
  await api.as("student");
  const response = await api.get("/api/texts");

  expect(await response.json()).toHaveProperty(
    "data[0].id",
    "1a5c4380-d96f-33f0-886a-4e4f77632ac0",
  );
});

test("shows a text", async ({ api }) => {
  await api.as("student");
  const response = await api.get(
    "/api/texts/1a5c4380-d96f-33f0-886a-4e4f77632ac0",
  );

  expect(await response.json()).toHaveProperty("data.name", "QA Test n1");
});
