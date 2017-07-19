/**
 * @fileoverview Entry point for eslint-plugin-editorconfig.
 * @author Kevin Partington
 */

const editorconfig = require("editorconfig");
const path = require("path");

const parsedConfig = editorconfig.parseSync(path.join(process.cwd(), "/index.js"));

const eslintRules = require("./convert-to-eslint")(parsedConfig);

module.exports = {
    configs: {
        auto: {
            rules: eslintRules
        }
    }
};
