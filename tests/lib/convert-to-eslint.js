/**
 * @fileoverview Unit tests for ESLint converter logic.
 * @author Kevin Partington
 */

const { describe, it } = require("mocha");
const assert = require("chai").assert;
const convertToESLint = require("../../lib/convert-to-eslint");

describe("convert-to-eslint", function() {
    it("sanity test", function() {
        assert.ok(convertToESLint);
    });
});
