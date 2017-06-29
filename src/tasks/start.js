let chalk = require('chalk');
let portfinder = require('portfinder');
let ora = require('ora');
let compiler = require('../utils/compiler');
let errorHandler = require('../utils/errorHandler');

module.exports = function(argv) {
	let showHeader = true;
	let spinner = ora('Starting').start();

	argv.host = argv.host || '0.0.0.0';
	argv.port = argv.port || 3000;
	argv.notify = argv.notify !== undefined ? argv.notify : true;

	portfinder.basePort = argv.port;

	portfinder.getPort((error, port) => {
		if (error) { throw new Error(error); }

		try {
			argv.port = port;

			return compiler('dev', argv, (hasErrors, details, webpackConfig) => {
				spinner.stop();

				if (showHeader) {
					console.log('Started:             ', chalk.green.bold('yes'));
					console.log('Watching for changes:', chalk.green.bold('yes'));
					console.log('Address:             ', chalk.green.bold(`http://${argv.host}:${chalk.cyan(argv.port)}`));

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

				console.log(details);
			});
		} catch (error) {
			spinner.stop();

			errorHandler('start', error);
		}
	});
};