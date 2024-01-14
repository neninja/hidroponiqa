import { APIRequestContext, test as baseTest } from "@playwright/test";

class ApiHelper {
  readonly request: APIRequestContext;
  public currentUserToken: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async newToken({ email, password }: { email: string; password: string }) {
    const tokenResponse = await this.request.post("/api/tokens", {
      data: { email, password },
    });

    return (await tokenResponse.json()).access_token;
  }

  async as(user: string) {
    switch (user) {
      case "admin":
        this.currentUserToken = await this.newAdminToken();
        break;
      case "student":
        this.currentUserToken = await this.newStudentToken();
        break;
      default:
        throw new Error(`Unknown user: ${user}`);
    }

    return this;
  }

  async get(path: string) {
    return this.request.get(path, {
      headers: {
        Authorization: `Bearer ${this.currentUserToken}`,
      },
    });
  }

  async post(path: string, data: unknown) {
    return this.request.post(path, {
      headers: {
        Authorization: `Bearer ${this.currentUserToken}`,
      },
      data,
    });
  }

  async newAdminToken() {
    return this.newToken({
      email: "qa_admin@hidroponi.ca",
      password: "123",
    });
  }

  async newStudentToken() {
    return this.newToken({
      email: "qa_student@hidroponi.ca",
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
