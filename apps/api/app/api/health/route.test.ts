import { GET } from "./route";

describe("Health API", () => {
  it("should return status 200 and ok message", async () => {
    const response = await GET();
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.status).toBe("ok");
    expect(data.timestamp).toBeDefined();
  });
});
