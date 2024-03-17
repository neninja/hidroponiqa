import { expect, test } from "./fixture";

test("list texts", async ({ api }) => {
  await api.as("student");
  const response = await api.get("/api/texts");

  expect(await response.json()).toHaveProperty(
    "data[0].id",
    "51882430-4ac9-3eab-b903-f91b3bb5656e",
  );
});

test("shows a text", async ({ api }) => {
  await api.as("student");
  const response = await api.get(
    "/api/texts/51882430-4ac9-3eab-b903-f91b3bb5656e",
  );

  expect(await response.json()).toHaveProperty(
    "data.name",
    "The Fox and the Grapes",
  );
});
