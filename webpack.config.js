"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "/src/", "app.js"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  //devtool: 'inline-source-map',
  devServer: {
    contentBase: "./build"
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  externals: {
    jquery: "jQuery"
  }
};
