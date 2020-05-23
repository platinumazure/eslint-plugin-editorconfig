# eslint-plugin-editorconfig
[![Build Status](https://travis-ci.org/platinumazure/eslint-plugin-editorconfig.svg?branch=master)](https://travis-ci.org/platinumazure/eslint-plugin-editorconfig)
[![Dependency Status](https://david-dm.org/platinumazure/eslint-plugin-editorconfig/status.svg)](https://david-dm.org/platinumazure/eslint-plugin-editorconfig)
[![devDependency Status](https://david-dm.org/platinumazure/eslint-plugin-editorconfig/dev-status.svg)](https://david-dm.org/platinumazure/eslint-plugin-editorconfig?type=dev)

ESLint plugin which generates some core ESLint rules' configuration based on
a repository's `.editorconfig` file.

**Warning:** This plugin is highly experimental and is probably not suitable for production use at this time. There are also some known limitations, including the fact that nested .editorconfig files will not work correctly. Use at your own risk.

## Supported properties (mapped to ESLint rule)

|`.editorconfig` [properties](https://editorconfig.org/#supported-properties)|ESLint rule|ESLint options
|--------------------------|-----------|-----|
|`indent_style` and `indent_size`|[`indent`](https://eslint.org/docs/rules/indent)|"tab" or number
|`end_of_line`|[`linebreak-style`](https://eslint.org/docs/rules/linebreak-style)|"unix"\|"windows"
|`trim_trailing_whitespace`|[`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)|Not used
|`insert_final_newline`|[`eol-last`](https://eslint.org/docs/rules/eol-last)|"always"\|"never"
|`max_line_length`|[`max-len`](https://eslint.org/docs/rules/max-len)|Number option only

## Unused properties:

These [properties](https://editorconfig.org/#supported-properties) are unused:

- `tab_width`
- `charset`
- `root`

## Available Configurations

You can extend from this configuration to generate an ESLint configuration that
matches your `.editorconfig` file.

For more details on how to extend your configuration from one or both of these plugin configurations, please see the [ESLint plugin configuration documentation](http://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin).

### auto

This configuration will look for an `.editorconfig` file in your current working
directory or its ancestors and generate an ESLint configuration from the
properties in that file.

You can use this configuration by extending from `"plugin:editorconfig/auto"` in your configuration file.

## Semantic Versioning Policy

Like ESLint itself, this ESLint plugin follows [semantic versioning](http://semver.org). However, due to the nature of ESLint as a code quality tool, it's not always clear when a minor or major version bump occurs. To help clarify this for everyone, we've defined the following semantic versioning policy, based on the policy used by ESLint:

* Patch release (intended not to break your lint build)
    * Backward-compatible bug fixes around how ESLint configuration is generated.
    * Improvements to documentation.
    * Non-user-facing changes such as refactoring code; adding, deleting, or modifying tests; and increasing test coverage.
    * Re-releasing after a failed release (i.e., after having published a release that doesn't work for anyone).
* Minor release (might break your lint build)
    * A new rule is supported in config generation.
    * A new plugin configuration is created.
* Major release (likely to break your lint build)
    * A backward-incompatible change is made to the generation of ESLint configuration.
