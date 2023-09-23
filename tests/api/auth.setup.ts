import { test as setup } from "@playwright/test";

const authFile = "tests/.auth/user.json";

setup("authenticate", async ({ request }) => {
  // Send authentication request. Replace with your own.
  await request.post("/api/tokens", {
    form: {
      user: "user",
      password: "password",
    },
  });
  await request.storageState({ path: authFile });
});
