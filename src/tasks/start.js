let chalk = require('chalk');
let portfinder = require('portfinder');
let compiler = require('../utils/compiler');
let errorHandler = require('../utils/errorHandler');

module.exports = function(argv) {
	let showError = errorHandler('An error occurred while starting the application! Are you in a wrong folder, maybe?');
	let showHeader = true;

	argv.host = argv.host || '0.0.0.0';
	argv.port = argv.port || 3000;

	portfinder.basePort = argv.port;

	portfinder.getPort((error, port) => {
		if (error) { return showError(error); }

		try {
			argv.port = port;

			return compiler('dev', argv, (hasErrors, details) => {
				if (hasErrors) { return showError(details); }

				if (showHeader) {
					console.log('application started: ', chalk.green('yes'));
					console.log('watching for changes:', chalk.green('yes'));
					console.log('address:             ', chalk.green(`http://${argv.host}:${argv.port}`));

					console.log();

					console.log(chalk.green('Happy coding :)\n'));

					showHeader = false;
				}

				console.log();

				console.log(details);
			});
		} catch (error) {
			return showError(error);
		}
	});
};