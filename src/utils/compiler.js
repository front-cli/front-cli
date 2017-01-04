let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');
let path = require('path');
let _ = require('underscore');
let Notifier = require('./notifier');

module.exports = function(mode = 'dev', options, callback) {
	let webpackConfigPath = path.resolve(process.cwd(), `build/webpack.config.${mode}.js`);
	let webpackConfig = require(webpackConfigPath)(require);
	let compiler;

	webpackConfig.resolve.root.push( path.resolve(__dirname, '../../node_modules') );

	webpackConfig.resolveLoader = {
		root: [
			path.resolve(process.cwd(), 'node_modules'),
			path.resolve(__dirname, '../../node_modules'),
			'node_modules'
		]
	};

	if (options.notify) {
		webpackConfig.plugins.push( new Notifier() );
	}

	if (mode === 'dev') {
		let devServerEntry = path.resolve(__dirname, '../../node_modules/webpack-dev-server/client?{{host}}:{{port}}/');

		devServerEntry = devServerEntry.replace('{{host}}', `http://${options.host}`);
		devServerEntry = devServerEntry.replace('{{port}}', options.port);

		if (_.isArray(webpackConfig.entry)) {
			webpackConfig.entry.unshift( path.resolve(__dirname, '../../node_modules/webpack/hot/dev-server') );
			webpackConfig.entry.unshift( devServerEntry );
		} else {
			if (webpackConfig.entry.application) {
				webpackConfig.entry.application.unshift( path.resolve(__dirname, '../../node_modules/webpack/hot/dev-server') );
				webpackConfig.entry.application.unshift( devServerEntry );
			} else {
				throw new Error('When using multiple entry points, at least one must be called "application".');
			}
		}

		webpackConfig.plugins.unshift( new webpack.HotModuleReplacementPlugin() );

		compiler = webpack(webpackConfig);

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
			chunks: false
		});

		if (stats.hasErrors() || stats.hasWarnings()) {
			details = stats.toString({
				colors: true,
				version: false,
				timings: false,
				hash: false,
				assets: false,
				children: false,
				chunks: false
			});
		}

		return callback(stats.hasErrors(), details);
	});
};