const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const fs = require("fs");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pages = fs.readdirSync("./pug").filter(name => name.endsWith(".pug"));

module.exports = {
    target: 'node',
    mode: "development",
    devtool: false,
    entry: {
        friends: "./webpack_entry/friends.js",
        news: "./webpack_entry/news.js",
        start: "./webpack_entry/start.js",
        manager: "./js/manager.js",
    },
    output: {
        library: "global",
        path: path.resolve(__dirname, "dist"),
        filename: "./js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                use: [
                    "pug-loader"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/preset-env"] }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        ...pages.map(file => new HtmlWebpackPlugin({
            template: `./pug/${file}`,
            templateParameters: {dir: "./dist"},
            filename: `./html/${file.replace(/\.pug/,'.html')}`,
            //inject: 'body',
            chunks: [file.replace(/\.pug/, "")]
        })),

    ]
}