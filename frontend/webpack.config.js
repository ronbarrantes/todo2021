const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const plugins = [
    new CopyWebpackPlugin({ patterns: [{ from: 'public', to: 'public' }] }),
    new HtmlWebpackPlugin({
        title: `Todo Site`,
        meta: {
            viewport: `width=device-width, initial-scale=1, shrink-to-fit=no`,
        },
        favicon: './public/assets/favicon.png',
    }),
]

module.exports = {
    plugins,
    watch: true,
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
}
