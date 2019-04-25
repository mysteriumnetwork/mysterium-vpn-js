module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        }
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint'
    ],
    plugins: ['prettier', '@typescript-eslint'],
    env: {
        es6: true,
        node: true,
        jest: true
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
    },
    overrides: [
        {
            "files": [
                "**/*.spec.ts",
                "**/test-utils/**",
            ],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
            }
        }
    ]
};
