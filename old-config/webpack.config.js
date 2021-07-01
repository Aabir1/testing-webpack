'use strict';

const path = require('path');
const webpack = require('webpack');

const headerPath = './common/pages/header.js';
const connectionLostPath = './common/pages/connectionLost.js';
const acceptNewTermsOfService = './common/pages/acceptNewTermsOfService.js';
const commonComponents = [headerPath, connectionLostPath, acceptNewTermsOfService];

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LessExtractCss = new ExtractTextPlugin({
	filename:  getPath => getPath('css/[name]-js.css').replace('css', '../../css')
});

function resolve(relPath){
	return path.resolve(__dirname, relPath);
}

const AntdChunks = new webpack.optimize.CommonsChunkPlugin({
	name: 'antd',
	minChunks: module => module.context && module.context.indexOf('antd') !== -1
});

module.exports = {
    context: __dirname,
    entry: {
		// header
		'header' : commonComponents,

		// Auth
        'login': './auth/pages/login.js',
        'register': './auth/pages/register.js',
        'reset-password': './auth/pages/reset-password.js',
		'complete-registration': './auth/pages/complete-registration.js',

	},
    output: {
        path: resolve('../public/js/pages'),
        filename: "[name].js"
    },
    devtool: 'source-map',
    resolve: {
        modules: ["node_modules", "./"],
        extensions: ['.js', '.jsx', '.less'],
        alias: {
			'react': resolve('node_modules/react'),
			'asn1.js': 'node_modules/asn1.js/'
		}
    },
    plugins: [LessExtractCss],
	resolveLoader: {
		modules: ['node_modules']
	},
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015"]
                }
            }, {
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: 'css-loader'
					}, {
						loader: "less-loader"
					}, {
						loader: 'antd-loader',
						query: {
							override: {
								srcDir: resolve('./less/antd/'),
								files: [/lib\/style/]
							},
							namespace: {
								selector: '.ns-ant',
								files: [/lib\/form/]
							}
						}
					}]
				})
			}
        ]
    },
    node: {
        fs: "empty"
    }

};
