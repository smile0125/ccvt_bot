const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    // entry: path.join(__dirname, './src/index.js'),
    entry: {
        app: ['babel-polyfill', path.resolve('src/index.js')]
      },
    output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: '8000',
        overlay: true
    },
    module: {
        rules: [{
                test: /\.(css|scss|less)$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ['babel-loader'],
            }
        ]
    },
    //用于热加载
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './src/index.html')
        })
    ]
}