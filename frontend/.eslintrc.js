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
        '@typescript-eslint/no-use-before-define': ['error'],
        semi: ['error', 'never'],
        quotes: ['warn', 'single', { allowTemplateLiterals: true }],
        indent: ['error', 4, { SwitchCase: 1, ignoreComments: true }],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts', '.js', '.jsx'] }],
        'no-use-before-define': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 1 }],
        'comma-dangle': ['error', 'always-multiline'],
        'object-curly-spacing': ['warn', 'always'],
        'arrow-spacing': 'error',
        'brace-style': ['error', '1tbs'],
        'space-in-parens': ['warn', 'never'],
        'no-whitespace-before-property': 2,
        'jsx-quotes': ['error', 'prefer-double'],
        'switch-colon-spacing': ['error', { after: true, before: false }],
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
