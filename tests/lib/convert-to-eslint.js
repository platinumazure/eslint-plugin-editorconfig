/**
 * @fileoverview Unit tests for ESLint converter logic.
 * @author Kevin Partington
 */

const { beforeEach, describe, it } = require("mocha");
const assert = require("chai").assert;
const convertToESLint = require("../../lib/convert-to-eslint");

describe("convert-to-eslint", function() {
    describe("Generated rules", function() {
        describe("indent", function() {
            describe("2 spaces", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        indent_size: "2",
                        indent_style: "space"
                    });
                });

                it("should result in indent: [\"error\", 2]", function() {
                    assert.deepEqual(this.result, {
                        indent: ["error", 2]
                    });
                });
            });

            describe("4 spaces", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        indent_size: "4",
                        indent_style: "space"
                    });
                });

                it("should result in indent: [\"error\", 4]", function() {
                    assert.deepEqual(this.result, {
                        indent: ["error", 4]
                    });
                });
            });

            describe("Tabs (width: 2)", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        indent_size: 2,
                        indent_style: "tab"
                    });
                });

                it("should result in indent: [\"error\", \"tab\"]", function() {
                    assert.deepEqual(this.result, {
                        indent: ["error", "tab"]
                    });
                });
            });

            describe("Tabs (width: 4)", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        indent_size: 4,
                        indent_style: "tab"
                    });
                });

                it("should result in indent: [\"error\", \"tab\"]", function() {
                    assert.deepEqual(this.result, {
                        indent: ["error", "tab"]
                    });
                });
            });

            describe("Missing indent_style", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        indent_size: 4
                    });
                });

                it("should result in no indent rule", function() {
                    assert.notProperty(this.result, "indent");
                });
            });

            describe("Missing indent_size, indent_style is space", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        indent_style: "space"
                    });
                });

                it("should result in no indent rule", function() {
                    assert.notProperty(this.result, "indent");
                });
            });

            describe("Missing indent_size, indent_style is tab", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        indent_style: "tab"
                    });
                });

                it("should result in indent: [\"error\", \"tab\"]", function() {
                    assert.deepEqual(this.result, {
                        indent: ["error", "tab"]
                    });
                });
            });
        });

        describe("linebreak-style", function() {
            describe("end_of_line=crlf", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        end_of_line: "crlf"
                    });
                });

                it("should result in linebreak-style: [\"error\", \"windows\"]", function() {
                    assert.deepEqual(this.result, {
                        "linebreak-style": ["error", "windows"]
                    });
                });
            });

            describe("end_of_line=lf", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        end_of_line: "lf"
                    });
                });

                it("should result in linebreak-style: [\"error\", \"unix\"]", function() {
                    assert.deepEqual(this.result, {
                        "linebreak-style": ["error", "unix"]
                    });
                });
            });

            describe("end_of_line=cr", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        end_of_line: "cr"
                    });
                });

                it("should result in no linebreak-style rule", function() {
                    assert.notProperty(this.result, "linebreak-style");
                });
            });
        });

        describe("no-trailing-spaces", function() {
            describe("trim_trailing_whitespace=true", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        trim_trailing_whitespace: true
                    });
                });

                it("should result in no-trailing-spaces: [\"error\"]", function() {
                    assert.deepEqual(this.result, {
                        "no-trailing-spaces": ["error"]
                    });
                });
            });

            describe("trim_trailing_whitespace=false", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        trim_trailing_whitespace: false
                    });
                });

                it("should result in no no-trailing-spaces rule", function() {
                    assert.notProperty(this.result, "no-trailing-spaces");
                });
            });
        });

        describe("eol-last", function() {
            describe("insert_final_newline=true", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        insert_final_newline: true
                    });
                });

                it("should result in eol-last: [\"error\", \"always\"]", function() {
                    assert.deepEqual(this.result, {
                        "eol-last": ["error", "always"]
                    });
                });
            });

            describe("insert_final_newline=false", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        insert_final_newline: false
                    });
                });

                it("should result in eol-last: [\"error\", \"never\"]", function() {
                    assert.deepEqual(this.result, {
                        "eol-last": ["error", "never"]
                    });
                });
            });
        });

        describe("max-len", function() {
            describe("max_line_length is numeric", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        max_line_length: 80
                    });
                });

                it("should result in max-len: [\"error\", 80]", function() {
                    assert.deepEqual(this.result, {
                        "max-len": ["error", 80]
                    });
                });
            });

            describe("max_line_length: \"off\"", function() {
                beforeEach(function() {
                    this.result = convertToESLint({
                        max_line_length: "off"
                    });
                });

                it("should result in no max-len rule", function() {
                    assert.notProperty(this.result, "max-len");
                });
            });
        });
    });

    describe("Negative tests", function() {
        [void 0, null, {}].forEach(function(editorconfig) {
            describe(`editorconfig is ${JSON.stringify(editorconfig)}`, function() {
                it("should result in empty ESLint config", function() {
                    const result = convertToESLint(editorconfig);
                    assert.deepEqual(result, {});
                });
            });
        });
    });
});
