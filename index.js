"use babel";

import { runCLI } from "jest-cli";
import * as tmp from "tmp";
import * as pkgUp from "pkg-up";
import util from "util";
import { remote } from "electron";

export default ({
  buildAtomEnvironment,
  buildDefaultApplicationDelegate,
  logFile,
  testPaths,
  headless
}) => {
  if (headless) {
    console.debug = console.log = function(...args) {
      const formatted = util.format(...args);
      process.stdout.write(`${formatted}\n`);
    };

    console.error = function(...args) {
      const formatted = util.format(...args);
      process.stderr.write(`${formatted}\n`);
    };

    Object.defineProperties(process, {
      stdout: { value: remote.process.stdout },
      stderr: { value: remote.process.stderr }
    });
  }

  const cwd = pkgUp.sync(testPaths[0]);

  global.atom = buildAtomEnvironment({
    applicationDelegate: buildDefaultApplicationDelegate(),
    window,
    document,
    configDirPath: tmp.dirSync().name,
    enablePersistence: false
  });

  return runCLI(
    {
      cache: true,
      outputFile: logFile,
      runInBand: true
    },
    [cwd]
  ).then(resp => (resp.results.success ? 0 : 1));
};
