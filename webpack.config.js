'use strict';

const path = require('path');
const webpack = require('webpack');

const headerPath = './common/pages/header.js';
const connectionLostPath = './common/pages/connectionLost.js';
const acceptNewTermsOfService = './common/pages/acceptNewTermsOfService.js';
const commonComponents = [headerPath, connectionLostPath, acceptNewTermsOfService];

// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const LessExtractCss = new ExtractTextPlugin({
// 	filename:  getPath => getPath('css/[name]-js.css').replace('css', '../../css')
// });

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LessExtractCss = new MiniCssExtractPlugin({
	filename:  getPath => getPath('css/[name]-js.css').replace('css', '../../css')
});


function resolve(relPath){
	return path.resolve(__dirname, relPath);
}

// const AntdChunks = new webpack.optimize.CommonsChunkPlugin({
// 	name: 'antd',
// 	minChunks: module => module.context && module.context.indexOf('antd') !== -1
// });

module.exports = {
    context: __dirname,

    entry: {
		// header
		'header' : commonComponents,

		// Auth
        'login': './auth/pages/login.js',
  //       'register': './auth/pages/register.js',
  //       'reset-password': './auth/pages/reset-password.js',
		// 'change-password': './auth/pages/change-password.js',
		// 'complete-registration': './auth/pages/complete-registration.js',

	},
    output: {
        path: resolve('../public/js/pages'),
        filename: "[name].js"
    },
    devtool: 'source-map',
    resolve: {
        modules: [
         	path.join(__dirname, 'common'),
	        path.join(__dirname, 'node_modules')
	    ],
        extensions: ['.js', '.jsx', '.less'],
        alias: {
			'react': resolve('node_modules/react'),
			'asn1.js': 'node_modules/asn1.js/',

  			'common': './common',
		}
    },
    plugins: [
    	LessExtractCss
    	//  [
	    //   "@babel/plugin-transform-runtime",
	    //   {
	    //     "absoluteRuntime": false,
	    //     "corejs": 3,
	    //     "version": "^7.7.4"
	    //   }
	    // ]
    ],
	resolveLoader: {
		modules: [
        	path.join(__dirname, 'node_modules')
		]
	},
    module: {
        rules: [
            {
                test: /\.jsx?$/, //[/\.js$/, /\.jsx/]
                loader: 'babel-loader',
                exclude: /node_modules/,
                // query: {
                //     presets: ["react", "es2015"]
                // },
                options: {
			      presets: ["react" ,"es2015"]
			    },
            }, {
				test: /\.less$/,
				use: [
					{ loader: 'css-loader' },
					{ loader: "less-loader" },
					{ loader: "style-loader"},
					{
						loader: 'antd-loader',
						options: {
							override: {
								srcDir: resolve('./less/antd/'),
								files: [/lib\/style/]
							},
							namespace: {
								selector: '.ns-ant',
								files: [/lib\/form/]
							}
						}
					}
				]
			},
        ]
    },
    optimization: {
    	splitChunks: {
		  chunks: 'async',
		  minSize: 30000,
		  minRemainingSize: 0,
		  maxSize: 0,
		  minChunks: 1,
		  maxAsyncRequests: 6,
		  maxInitialRequests: 4,
		  automaticNameDelimiter: '~',
		  cacheGroups: {
		    vendors: {
		      test: /[\\/]node_modules[\\/]/,
		    },
		    default: {
		      minChunks: 2,
		      priority: -20,
		      reuseExistingChunk: true
		    }
		  }
		}
    },
 //    resolve: {
	//     fallback: {
	//       fs: false
	//     }
	// }

};
