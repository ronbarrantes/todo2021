module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
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
        semi: ['error', 'never'],
        quotes: ['warn', 'single', { allowTemplateLiterals: true }],
        indent: ['error', 4, { SwitchCase: 1, ignoreComments: true }],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],

    /*
    // '@typescript-eslint/rule-name': 'error',
    // 'jsx-quotes': ['error', 'prefer-double'],
    'brace-style': ['error', '1tbs'],
    // 'no-multi-spaces': 'warn',
    'comma-spacing': ['warn', { before: false, after: true }],
    // 'require-atomic-updates': 'error',
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 1 }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['warn', 'always'],
    'no-console': 'off',
    // "no-console": [2, "error"],
    // 'no-unused-vars': 'off',

    'switch-colon-spacing': ['error', { after: true, before: false }],

    'space-in-parens': ['warn', 'never'],
    'new-cap': ['error', { capIsNewExceptions: ['Record', 'Router'] }],
    // camelcase: ['warn'],
    'no-whitespace-before-property': 2,
    'arrow-spacing': 'error',
    */
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
