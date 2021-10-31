module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "google",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["tsconfig.json", "tsconfig.dev.json"],
        sourceType: "module",
    },
    ignorePatterns: [
        "/lib/**/*", // Ignore built files.
        ".eslintrc.js"
    ],
    plugins: [
        "@typescript-eslint",
        "import",
    ],
    rules: {
        quotes: ["off", "double"],
        semi: "off",
        indent: ["error", 4],
        "quote-props": ["error", "consistent-as-needed"],
        "no-unused-vars": "off",
        "require-jsdoc": "off",
        "max-len": "off"
    },
};
