"use strict";

const JsdomEnvironment = require("jest-environment-jsdom");

class AtomEnvironment extends JsdomEnvironment {
  constructor(config) {
    super(
      Object.assign({}, config, {
        globals: Object.assign({}, config.globals, {
          atom: global.atom
        })
      })
    );
  }
}

module.exports = AtomEnvironment;
