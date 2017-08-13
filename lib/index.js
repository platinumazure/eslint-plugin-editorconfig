/**
 * @fileoverview Entry point for eslint-plugin-editorconfig.
 * @author Kevin Partington
 */

const fs = require("fs");
const editorconfig = require("editorconfig");
const glob = require("glob");
const path = require("path");

const convertToEslint = require("./convert-to-eslint");

const editorConfigFiles = glob.sync("**/.editorconfig", {
    nodir: true
});

const overrides = editorConfigFiles.map(configFilePath => {
    const configFileDirectory = path.dirname(configFilePath);

    // Read config file and parse into object.
    const configFileContents = fs.readFileSync(configFilePath, "utf-8");
    const configFileSections = editorconfig.parseString(configFileContents);

    return configFileSections
        .filter(pair => pair[0] && typeof pair[1] === "object")
        .map(pair => ({
            files: [`${configFileDirectory}/${pair[0]}`],
            rules: convertToEslint(pair[1])
        }));
}).reduce((allPatterns, thesePatterns) => allPatterns.concat(thesePatterns));

module.exports = {
    configs: {
        auto: {
            overrides
        }
    }
};
