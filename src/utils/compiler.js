let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');
let path = require('path');

module.exports = function(mode = 'dev', options, callback) {
	let webpackConfigPath = path.resolve(process.cwd(), `build/webpack.config.${mode}.js`);
	let webpackConfig = require(webpackConfigPath);
	let devServerEntry = path.resolve(__dirname, '../../node_modules/webpack-dev-server/client?{{host}}:{{port}}/');

	devServerEntry = devServerEntry.replace('{{host}}', `http://${options.host}`);
	devServerEntry = devServerEntry.replace('{{port}}', options.port);

	webpackConfig.entry.unshift( path.resolve(__dirname, '../../node_modules/webpack/hot/dev-server') );
	webpackConfig.entry.unshift( devServerEntry );
	webpackConfig.plugins.unshift( new webpack.HotModuleReplacementPlugin() );

	let compiler = webpack(webpackConfig);

	if (mode === 'dev') {
		new webpackDevServer(compiler, {
			hot: true,
			quiet: true,
			stats: {
				colors: true
			}
		}).listen(options.port, options.host);
	} else {
		compiler.run(() => {});
	}

	compiler.plugin('done', (stats) => {
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

		callback(stats.hasErrors(), details);
	});
};