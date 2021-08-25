module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
// '@typescript-eslint/rule-name': 'error',
        quotes: ['warn', 'single', { allowTemplateLiterals: true }],
// 'jsx-quotes': ['error', 'prefer-double'],
        'brace-style': ['error', '1tbs'],
        'no-multi-spaces': 'warn',
        'comma-spacing': ['warn', { before: false, after: true }],
        'require-atomic-updates': 'error',
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 1 }],
        'comma-dangle': ['error', 'always-multiline'],
        'object-curly-spacing': ['warn', 'always'],
        'no-console': 'off',
// 'no-unused-vars': 'off',
        indent: ['error', 4, { SwitchCase: 1, ignoreComments: true }],
        'switch-colon-spacing': ['error', { after: true, before: false }],
        semi: ['error', 'never'],
        'space-in-parens': ['warn', 'never'],
        'new-cap': ['error', { capIsNewExceptions: ['Record', 'Router'] }],
        camelcase: ['warn'],
        'no-whitespace-before-property': 2,
        'arrow-spacing': 'error',
    },
}