import execa from "execa";
import * as path from "path";
import isCI from "is-ci";

isCI && jest.setTimeout(60000); // Let Promises timeout after 1 minute on CI.

const cwd = path.join(__dirname, "__fixtures__", "basic");

describe("Basic Unit Tests", () => {
  describe("when run with `atom --test`", () => {
    it("runs successfully", async () => {
      try {
        const atomProcess = await execa(
          isCI && global.process.env.ATOM_CHANNEL === "beta"
            ? "atom-beta"
            : "atom",
          ["--test", "."],
          { cwd }
        );

        console.debug("stdout", atomProcess.stdout);
        console.debug("stderr", atomProcess.stderr);

        expect(atomProcess.failed).toBe(false);
        expect(atomProcess.stderr.length).not.toBe(0); // Test results are outputted to stderr.
      } catch (e) {
        console.debug(e);
        fail(e);
      }
    });
  });

  // Maybe don't test apm?
  // if (!(isCI && global.process.env.ATOM_CHANNEL === "beta")) {
  //   describe("when run with `apm test`", () => {
  //     it("runs successfully", async () => {
  //       try {
  //         const process = await execa("apm", ["test"], { cwd });
  //
  //         expect(process.failed).toBe(false);
  //         expect(process.stderr.length).not.toBe(0); // Test results are outputted to stderr.
  //       } catch (e) {
  //         console.debug(e);
  //         fail(e);
  //       }
  //     });
  //   });
  // }
});
