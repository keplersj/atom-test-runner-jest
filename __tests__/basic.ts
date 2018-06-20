import execa from "execa";
import * as path from "path";

// jest.setTimeout(60000); // Let Promises timeout after 1 minute.

const cwd = path.join(__dirname, "__fixtures__", "basic");

describe("Basic Unit Tests", () => {
  describe("when run with `atom --test`", () => {
    it("runs successfully", async () => {
      const process = await execa("atom", ["--test", "."], { cwd });

      expect(process.failed).toBe(false);
      expect(process.stderr.length).not.toBe(0); // Test results are outputted to stderr.
    });
  });

  describe("when run with `apm test`", () => {
    it("runs successfully", async () => {
      const process = await execa("apm", ["test"], { cwd });

      expect(process.failed).toBe(false);
      expect(process.stderr.length).not.toBe(0); // Test results are outputted to stderr.
    });
  });
});
