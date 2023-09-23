import { expect, test } from "./fixture";

test("requires authentication", async ({ request }) => {
  const response = await request.get("/api/me", {
    headers: {
      Authorization: "",
    },
  });

  expect(response.status()).toBe(401);
});

test("gets current user", async ({ request, api }) => {
  const token = await api.newAdminToken();

  const meResponse = await request.get("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(meResponse.status()).toBe(200);
  expect(await meResponse.json()).toHaveProperty("data.id");
});
