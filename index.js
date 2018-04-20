"use babel";

import { runCLI } from "jest-cli";
const tmp = require("tmp");
const pkgUp = require("pkg-up");
const remote = require("electron").remote;

export default ({
  buildAtomEnvironment,
  buildDefaultApplicationDelegate,
  logFile,
  testPaths,
  headless
}) => {
  const cwd = pkgUp.sync(testPaths[0]);

  global.atom = buildAtomEnvironment({
    applicationDelegate: buildDefaultApplicationDelegate(),
    window,
    document,
    configDirPath: tmp.dirSync().name,
    enablePersistence: false
  });

  if (headless) {
    Object.defineProperties(process, {
      stdout: { value: remote.process.stdout },
      stderr: { value: remote.process.stderr }
    });
  } else {
    process.on("uncaughtException", console.error.bind(console));
  }

  return runCLI(
    {
      cache: true,
      _: testPaths,
      outputFile: logFile,
      runInBand: true
    },
    [cwd]
  ).then(resp => (resp.results.success ? 0 : 1));
};
