var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: './<%= pkg.src %>/',
        historyApiFallback: true,
    },

    entry: {
        'main': './app/main.ts',
    },

    output: {
        path: './dist',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader'],
                exclude: ["./assets/", "./images/"]
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: ["./index.html"]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
        exclude: ["./assets/", "./images/"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyWebpackPlugin([
                {from: "./assets", to: "./assets"},
                {from: "./images", to: "./images"}
            ]
        )
    ]
};