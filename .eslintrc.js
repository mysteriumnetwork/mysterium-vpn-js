module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        }
    },
    env: {
        es6: true,
        node: true,
        jest: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint'
    ],
    plugins: [
        'prettier',
        '@typescript-eslint',
        'header'
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
        'header/header': [2, 'block', [
            '*',
            {pattern: ' * Copyright \\(c\\) \\d{4} BlockDev AG', template: ' * Copyright (c) 2020 BlockDev AG'},
            ' *',
            ' * This source code is licensed under the MIT license found in the',
            ' * LICENSE file in the root directory of this source tree.',
            ' '
        ]]
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
