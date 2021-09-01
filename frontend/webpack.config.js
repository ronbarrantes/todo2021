/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

const plugins = [
    // new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
        title: `Todo Site`,
        meta: {
            viewport: `width=device-width, initial-scale=1, shrink-to-fit=no`,
        },
        favicon: './src/assets/img/favicon.png',
    }),

    new EnvironmentPlugin({
        NODE_ENV: process.env.NODE_ENV,
        ASSETS_PATH: process.env.ASSETS_PATH,
        API_URL: process.env.API_URL,
    }),

    new MiniCssExtractPlugin({
        filename: !production ? '[name].css' : '[name].[hash].css',
        chunkFilename: !production ? '[id].css' : '[id].[hash].css',
    }),

//   new OptimizeCSSAssetsPlugin({}),
]

const optimization = {
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
            },
        },
    },
}

// if (production) {
//   optimization.minimizer = [new UglifyJsPlugin()]
// }

module.exports = {
    plugins,
    optimization,
    devtool: production ? undefined : 'source-map',
    mode: process.env.NODE_ENV,
    entry: `${__dirname}/src/main.js`,

    output: {
        filename: 'bundle.[hash].js',
        path: `${__dirname}/dist`,
        publicPath: process.env.CDN_URL,
    },

    devServer: {
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
            },

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    !production ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                            name: 'font/[name].[hash].[ext]',
                        },
                    },
                ],
            },

            {
                test: /\.(jpg|gif|png|svg)$/,
                exclude: /\.icon\.svg$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'image/[name].[hash].[ext]',
                    },
                }],
            },

            {
                test: /\.icon\.svg$/,
                loader: 'raw-loader',
            },
        ],
    },
}
