const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = {
  context: __dirname + "/src",

  entry: {
    javascript: "./js/index.jsx",
  },

  output: {
    filename: "index.js",
    path: __dirname + "/public/js",
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: "babel-loader",
        query: {
            presets: ['es2015']
        }
      },      
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'index.html', to: '../index.html' },
        { from: 'assets', to: '../assets' },
    ])
   ]

}