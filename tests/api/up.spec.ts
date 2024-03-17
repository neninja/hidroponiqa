import { expect, test } from "./fixture";

test("has an ok response", async ({ api }) => {
  const response = await api.get("/api/up");
  expect(response.status()).toBe(200);
});
