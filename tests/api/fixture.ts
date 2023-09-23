import { APIRequestContext, test as baseTest } from "@playwright/test";

class ApiHelper {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async newToken({ email, password }: { email: string; password: string }) {
    const tokenResponse = await this.request.post("/api/tokens", {
      data: { email, password },
    });

    return (await tokenResponse.json()).access_token;
  }

  async newAdminToken() {
    return await this.newToken({
      email: "admin@hidroponi.ca",
      password: "123",
    });
  }
}

export const test = baseTest.extend<{
  api: ApiHelper;
}>({
  api: async function ({ request }, use) {
    return await use(new ApiHelper(request));
  },
});

export { expect } from "@playwright/test";
