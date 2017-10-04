let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');
let chalk = require('chalk');
let path = require('path');
let Notifier = require('./notifier');
let errorHandler = require('../utils/errorHandler');

module.exports = function(mode = 'dev', options, callback) {
	let webpackConfig = require(options.config)(require);
	let compiler;

	webpackConfig.resolve.modules.push( path.resolve(__dirname, '../../node_modules') );

	webpackConfig.resolveLoader = {
		modules: [
			path.resolve(process.cwd(), 'node_modules'),
			path.resolve(__dirname, '../../node_modules'),
			'node_modules'
		]
	};

	webpackConfig.plugins.push( new ProgressBarPlugin({
		format: `0% ${chalk.green.bold(':bar')} 100% (:elapsed seconds)`,
		incomplete: ' ',
		complete: '■',
		clear: false,
		summary: false
	}) );

	if (options.notify) {
		webpackConfig.plugins.push( new Notifier() );
	}

	if (mode === 'dev') {
		webpackDevServer.addDevServerEntrypoints(webpackConfig, {
			host: options.host,
			port: options.port,
			hot: true
		});

		compiler = webpack(webpackConfig);

		if (webpackConfig.devServer && webpackConfig.devServer.proxy) {
			let proxies = webpackConfig.devServer.proxy;

			for (let p in proxies) {
				proxies[p].logProvider = function(provider) {
					provider.error = function(error) {
						console.log();
						Notifier().notify('[PROXY ERROR] Details in terminal.', 'error');
						errorHandler('proxy', error);
					};

					return provider;
				};
			}
		}

		new webpackDevServer(compiler, webpackConfig.devServer).listen(options.port, options.host);
	} else {
		compiler = webpack(webpackConfig);

		compiler.run(() => {});
	}

	compiler.plugin('done', stats => {
		let details = stats.toString({
			colors: true,
			version: true,
			timings: true,
			hash: false,
			assets: true,
			children: false,
			chunks: false,
			modules: false
		});

		if (stats.hasErrors() || stats.hasWarnings()) {
			details = stats.toString({
				colors: true,
				version: false,
				timings: false,
				hash: false,
				assets: false,
				children: false,
				chunks: false,
				modules: false
			});
		}

		if (mode === 'dev') {
			return callback(stats.hasErrors(), details, webpackConfig);
		} else {
			return callback(stats.hasErrors() || stats.hasWarnings(), details, webpackConfig);
		}
	});
};