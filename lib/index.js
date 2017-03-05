/**
 * @fileoverview Entry point for eslint-plugin-editorconfig.
 * @author Kevin Partington
 */

const editorconfig = require("editorconfig");

const parsedConfig = editorconfig.parseSync(process.cwd());

const eslintRules = require("./convert-to-eslint")(parsedConfig);

module.exports = {
    configs: {
        auto: {
            rules: eslintRules
        }
    }
};
