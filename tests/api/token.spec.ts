import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("issue token for protected endpoint", async ({ request }) => {
  const response = await request.post("/api/tokens", {
    data: {
      email: "qa_admin@hidroponi.ca",
      password: "123",
    },
  });

  expect(response.status()).toBe(200);

  expect(await response.json()).toHaveProperty("access_token");
});

test("doest not issue token", async ({ request }) => {
  const response = await request.post("/api/tokens", {
    data: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });

  expect(response.status()).toBe(401);
});
