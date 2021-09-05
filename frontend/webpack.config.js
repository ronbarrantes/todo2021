const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATHS = {
    public: path.join(__dirname, 'public'),
    dist: path.join(__dirname, 'dist'),
}

const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: 'public', to: 'public' }] }),
    new HtmlWebpackPlugin({
        title: 'Todo Site Frontend',
        meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        favicon: './public/assets/favicon.png',
    }),

]

module.exports = {
    plugins,
    mode: 'development',
    entry: './src/main.tsx',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[chunkhash].js',
        path: PATHS.dist,
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.(woff|woff2|ttf|eot).*/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'font/[name].[chunkhash].[ext]',
                        },
                    },
                ],
            },

            {
                test: /\.(jpg|gif|png|svg)$/,
                exclude: /\.icon\.svg$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'image/[name].[chunkhash].[ext]',
                        },
                    },
                ],
            },

            {
                test: /\.icon\.svg$/,
                loader: 'raw-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.sass'],

    },
}
