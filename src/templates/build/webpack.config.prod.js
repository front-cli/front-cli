var pkg = require('../package.json');

// the 'require' parameter is in the context of front-cli, not the application
module.exports = function(require) {
	var path = require('path');
	var webpack = require('webpack');
	var ExtractTextPlugin = require('extract-text-webpack-plugin');
	var HtmlWebpackPlugin = require('html-webpack-plugin');

	return {
		entry: [
			path.resolve(__dirname, '../application/main.js')
		],

		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: 'js/application-[hash].js'
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
					loaders: ['babel-loader', 'eslint-loader'],
					exclude: /node_modules/
				},
				{
					test: /\.css$/i,
					loader: ExtractTextPlugin.extract(['css-loader'], { publicPath: '../../' })
				},
				{
					test: /\.(eot|woff2?|ttf|svg|png|jpg|gif|bmp)(\?.*)*$/i,
					loader: 'file-loader',
					query: {
						name: 'assets/img/[name].[ext]'
					}
				},
				{
					test: /\.json$/,
					loader: 'json-loader',
					exclude: /node_modules/
				}
			]
		},

		babel: {
			presets: [require.resolve('babel-preset-es2015')],
			plugins: [require.resolve('babel-plugin-transform-runtime')],
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
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production'),
					BABEL_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: { warnings: false },
				output: { comments: false }
			}),
			new webpack.BannerPlugin([
				pkg.name +  ' ' + pkg.version + ' - ' + pkg.description,
				'\nDevelopers:\n',
				pkg.authors.map(function(a) { return '\t' + a;}).join('\n')
			].join('\n'), { entryOnly: true }),
			new ExtractTextPlugin('assets/css/application-[hash].css', { allChunks: true }),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'index.html',
				favicon: 'favicon.ico'
			})
		]
	};
};