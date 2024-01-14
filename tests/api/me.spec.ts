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

  const response = await request.get("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.status()).toBe(200);
  expect(await response.json()).toHaveProperty("data.id");
});

test("gets test user", async ({ request, api }) => {
  const token = await api.newStudentToken();

  const response = await request.get("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.status()).toBe(200);
  expect(await response.json()).toHaveProperty(
    "data.email",
    "qa_student@hidroponi.ca",
  );
});
