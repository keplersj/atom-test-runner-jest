"use babel";

import { runCLI } from "jest-cli";
import * as tmp from "tmp";
import * as pkgUp from "pkg-up";
import { Console } from "console";

export default ({
  buildAtomEnvironment,
  buildDefaultApplicationDelegate,
  logFile,
  testPaths,
  headless
}) => {
  if (headless) {
    const newConsole = new Console(process.stdout, process.stderr);

    global.console = newConsole;
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
