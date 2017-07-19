/**
 * @fileoverview Functional tests for the configuration root.
 * @author Kevin Partington
 */

const assert = require("chai").assert;
const path = require("path");
const requireUncached = require("require-uncached");

describe("Functional tests", () => {
    let originalCwd;

    before(() => {
        originalCwd = process.cwd();
    });
        
    after(() => process.chdir(originalCwd));

    describe("Simple configuration", () => {
        before(() => {
            process.chdir(path.resolve(__dirname, "../fixtures/simple"));
        });

        it("generates correct ESLint config", () => {
            const config = requireUncached("../..");

            assert.deepEqual(
                config,
                {
                    configs: {
                        auto: {
                            rules: {
                                indent: ["error", 4]
                            }
                        }
                    }
                }
            );
        });
    });

    describe("Nested configuration", () => {
        before(() => {
            process.chdir(path.resolve(__dirname, "../fixtures/nested"));
        });

        it("generates correct ESLint config for top-level file", () => {
            const config = requireUncached("../..");

            assert.deepEqual(
                config,
                {
                    configs: {
                        auto: {
                            rules: {
                                "eol-last": ["error", "always"],
                                indent: ["error", "tab"]
                            }
                        }
                    }
                }
            );
        });
    });
});
