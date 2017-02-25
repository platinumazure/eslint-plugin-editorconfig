/**
 * @fileoverview Conversion function to convert editorconfig into ESLint rules.
 * @author Kevin Partington
 */

const ruleConverters = {
    "indent": config => {
        if (!config.indent_style) {
            return null;
        }

        if (!config.indent_size && config.indent_style !== "tab") {
            return null;
        }
        
        return config.indent_style === "tab" ? ["tab"] : [config.indent_size]
    }
};

module.exports = function convert(parsedConfig) {
    return Object.keys(ruleConverters).reduce((memo, ruleName) => {
        const ruleOptions = ruleConverters[ruleName](parsedConfig);

        if (ruleOptions) {
            memo[ruleName] = ["error"].concat(ruleOptions);
        }

        return memo;
    }, {});
};
