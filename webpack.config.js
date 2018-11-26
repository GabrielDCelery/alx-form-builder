'use strict';

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = process.env.DEV === 'true' ? [] : [
    new UglifyJsPlugin({
        cache: true,
        parallel: true,
        test: /\.js($|\?)/i,
        extractComments: true
    })
];

module.exports = {
    entry: path.join(__dirname, '/src/', 'app.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'alx-dynamic-form-builder-bundle.min.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dev'
    },
    module: {
        loaders: [{
            test: /\.(png|jpg|svg)$/,
            use: {
                loader: 'file-loader'
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(scss)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [require('precss'), require('autoprefixer')];
                    }
                }
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    plugins: plugins,
    externals: {
        jquery: 'jQuery'
    }
};
