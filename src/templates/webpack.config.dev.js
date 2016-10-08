var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		path.resolve(__dirname, '../application/main.js')
	],

	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'application-[hash].js'
	},

	module: {
		loaders: [
			{
				test: /\.vue$/i,
				loader: 'vue-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/i,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				loaders: ['style-loader', 'css-loader']
			},
			{
				test: /\.(eot|woff2?|ttf|svg|png|jpg|gif|bmp)(\?.*)*$/i,
				loader: 'file-loader',
				query: {
					name: 'assets/img/[name].[ext]'
				}
			},
			{
				test: /\.json$/i,
				loader: 'json-loader',
				exclude: /node_modules/
			}
		]
	},

	babel: {
		presets: ['babel-preset-es2015'],
		plugins: ['babel-plugin-transform-runtime'],
		compact: true
	},

	resolve: {
		root: [
			path.resolve(__dirname, '../'),
			path.resolve(__dirname, '../application'),
			path.resolve(__dirname, '../node_modules')
		],
		extensions: ['', '.js', '.vue']
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			favicon: 'favicon.ico'
		}),
		// new plugins.Notifier()
	],

	devtool: 'cheap-module-eval-source-map'
};