import request from "supertest";

// Before running this test, the API server must be running on port 3001
const API_URL = "http://localhost:3001";

describe("API Integration Tests", () => {
  it("GET /api/health should return 200", async () => {
    const res = await request(API_URL).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("POST /api/leads should create a lead", async () => {
    const res = await request(API_URL).post("/api/leads").send({
      name: "Integration Test User",
      email: "integration@test.com",
      company: "ACME Corp",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("POST /api/contact should submit contact form", async () => {
    const res = await request(API_URL).post("/api/contact").send({
      name: "Integration Contact",
      email: "contact@test.com",
      message:
        "This is an integration test message with more than 10 characters.",
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
