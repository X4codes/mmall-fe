/*
* @Author: HUANGXI
* @Date:   2017-07-12 19:19:30
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-11 14:30:40
*/

var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)


// get html-webpack-plugin args
var getHtmlConfig = function (name, title) {
	return {
		template : './src/view/' + name + '.html',
		filename : 'view/' + name + '.html',
		title	 : title,
		inject   : true,
		hash     : true,
		chunks   : ['common', name]
	};
};

// webpack config 
var config = {
	entry: {
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/index.js'],
		'common': ['./src/page/common/index.js'],
		'result': ['./src/page/result/index.js'],
	},
	output:{
		path: './dist',
		publicPath : '/dist',
		filename: 'js/[name].js'
	},
	externals:{
		'jquery':'windows.jQuery'
	},
	module:{
		loaders:[
			{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader')},
			{test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?limit=100&name=resource/[name].[ext]'},
			{test: /\.string$/, loader: 'html-loader'}			
		]
	},
	resolve : {
		alias : {
			util     	  : __dirname + '/src/util',
			page    	  : __dirname + '/src/page',
			service       : __dirname + '/src/service',
			image   	  : __dirname + '/src/image',
			node_modules  : __dirname + '/node_modules',
		}
	},
	plugins:[
		//independent module -> js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename: 'js/base.js'
		}),
		// css files
		new ExtractTextPlugin('css/[name].css'),
		// html template
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
	]
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:3000/')
}

module.exports = config;
