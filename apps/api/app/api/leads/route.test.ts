import { POST } from "./route";

describe("Leads API", () => {
  it("should return 400 on invalid input", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({ email: "invalid-email" }),
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it("should return 201 on valid input and sanitize data", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({
        name: "John <script>",
        email: "test@example.com",
      }),
    });

    const response = await POST(req);
    expect(response.status).toBe(201);
  });
});
