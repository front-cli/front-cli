let chalk = require('chalk');
let portfinder = require('portfinder');
let ora = require('ora');
let compiler = require('../utils/compiler');
let errorHandler = require('../utils/errorHandler');

module.exports = function(argv) {
	let showHeader = true;
	let spinner = ora('Starting application').start();

	argv.host = argv.host || '0.0.0.0';
	argv.port = argv.port || 3000;
	argv.notify = argv.notify !== undefined ? argv.notify : true;

	portfinder.basePort = argv.port;

	portfinder.getPort((error, port) => {
		if (error) { throw new Error(error); }

		try {
			argv.port = port;

			return compiler('dev', argv, (hasErrors, details) => {
				if (hasErrors) { throw new Error(details); }

				spinner.stop();

				if (showHeader) {
					console.log('Application started: ', chalk.green('yes'));
					console.log('Watching for changes:', chalk.green('yes'));
					console.log('Address:             ', chalk.green(`http://${argv.host}:${argv.port}`));

					console.log();

					console.log(chalk.green('Happy coding :)'));

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