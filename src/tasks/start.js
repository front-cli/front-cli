let chalk = require('chalk');
let portfinder = require('portfinder');
let path = require('path');
let compiler = require('../utils/compiler');
let errorHandler = require('../utils/errorHandler');

module.exports = function(argv) {
	let showHeader = true;

	argv.host = argv.host || '0.0.0.0';
	argv.port = argv.port || 3000;
	argv.notify = argv.notify !== undefined ? argv.notify : true;
	argv.config = argv.config ? path.resolve(argv.config) : path.resolve(process.cwd(), 'build/webpack.config.dev.js');

	portfinder.basePort = argv.port;

	portfinder.getPort((error, port) => {
		if (error) { throw new Error(error); }

		try {
			argv.port = port;

			return compiler('dev', argv, (hasErrors, details, webpackConfig) => {
				if (showHeader) {
					console.log('Started and listening at:', chalk.green.bold(`http://localhost:${chalk.cyan(argv.port)}`));

					if (webpackConfig.devServer && webpackConfig.devServer.proxy) {
						let proxies = webpackConfig.devServer.proxy;

						console.log();

						proxies.forEach(p => {
							console.log('Proxying all', chalk.cyan.bold(p.context), 'requests to', chalk.cyan.bold(`${p.target}`));
							console.log();
						});
					} else {
						console.log();
					}

					console.log(chalk.green.bold('Happy coding :)'));

					showHeader = false;
				}

				console.log();

				if (hasErrors) {
					errorHandler('start', details);
				} else {
					console.log(details);
				}
			});
		} catch (error) {
			errorHandler('start', error);
		}
	});
};