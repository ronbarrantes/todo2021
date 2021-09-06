module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        // 'airbnb', // MAY USE AIRBNB LATER, NOT WORKING FOR ME RIGHT NOW
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],

    rules: {
        'jsx-quotes': ['error', 'prefer-double'],
        semi: ['error', 'never'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'brace-style': ['error', 'stroustrup'],
        'no-multi-spaces': 'warn',
        'comma-spacing': ['warn', { before: false, after: true }],
        'require-atomic-updates': 'error',
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': [
            'error',
            { max: 1, maxEOF: 1, maxBOF: 1 },
        ],
        'comma-dangle': ['error', 'always-multiline'],
        'object-curly-spacing': ['warn', 'always'],
        'no-console': 'off',
        'no-unused-vars': 'off',
        indent: ['error', 4, { SwitchCase: 1, ignoreComments: true }],
        'switch-colon-spacing': ['error', { after: true, before: false }],
        semi: ['error', 'never'],
        'space-in-parens': ['warn', 'never'],
        'new-cap': ['error', { capIsNewExceptions: ['Record'] }],
        camelcase: ['warn'],
        'no-whitespace-before-property': 2,
        'arrow-spacing': 'error',
    },

    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
}
