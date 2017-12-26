"use babel";

import { runCLI } from "jest-cli";

export default ({
  buildAtomEnvironment,
  buildDefaultApplicationDelegate,
  logFile,
  testPaths
}) => {
  global.atom = buildAtomEnvironment({
    applicationDelegate: buildDefaultApplicationDelegate(),
    window,
    document: window.document,
    configDirPath: process.env.ATOM_HOME,
    enablePersistence: false
  });

  return runCLI(
    {
      cache: false,
      _: testPaths,
      outputFile: logFile
    },
    [process.cwd()]
  ).then(resp => (resp.results.success ? 0 : 1));
};
