import { sanitizeInput, cn } from "../index";

describe("Utils package", () => {
  describe("sanitizeInput", () => {
    it("should remove < and > characters", () => {
      expect(sanitizeInput("<script>alert('xss')</script>")).toBe(
        "scriptalert('xss')/script",
      );
    });
  });

  describe("cn", () => {
    it("should merge classes", () => {
      expect(cn("foo", undefined, "bar", false)).toBe("foo bar");
    });
  });
});
