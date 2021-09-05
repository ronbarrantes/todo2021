// TODO: fix this file
const { merge } = require('webpack-merge')
const common = require('./webpack.config')

const { plugins } = common

const merged = merge(common, {
    plugins,
    mode: 'production',
    devtool: undefined,
    devServer: undefined,
    watch: false,
    output: {
        filename: '[name].js',
        publicPath: '/',
    },
})
console.log('#### BUILDING #####')
console.log(merged)
console.log('#### END BUILDING #####')
module.exports = merged
