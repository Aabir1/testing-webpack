'use strict';

var assignDeep          = require('object-assign-deep');
var webpack             = require('webpack');
var WebpackStripLoader  = require('strip-loader');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var devConfig           = require('./webpack.config.js');
var config              = assignDeep({}, devConfig);

var stripLoader = {
    test: [/\.js$/, /\.jsx/],
    exclude: /node_modules/,
    loader: WebpackStripLoader.loader('console.log')
};

config.module.rules.push(stripLoader);

config.plugins.push(new OptimizeCssAssetsPlugin({
	cssProcessorOptions: { discardComments: { removeAll: true } },
	canPrint: true
}));

// config.plugins.push(new webpack.optimize.TerserPlugin({
// 	exclude: [/ResizeImage.js$/i]
// }));

config.plugins.push(new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': JSON.stringify('production')
	}
}));

module.exports = config;