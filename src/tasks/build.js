let chalk = require('chalk');
let ora = require('ora');
let fs = require('fs-extra');
let path = require('path');
let compiler = require('../utils/compiler');
let errorHandler = require('../utils/errorHandler');

module.exports = function(argv) {
	let distFolder = path.resolve(process.cwd(), 'dist');
	let spinner = ora('Building').start();

	argv.notify = argv.notify !== undefined ? argv.notify : true;

	try {
		fs.remove(distFolder, error => {
			if (error) { throw new Error(error); }

			return compiler('prod', argv, (hasErrors, details) => {
				if (hasErrors) {
					spinner.stop();

					return errorHandler('build', details);
				}

				let configSrc = path.resolve(process.cwd(), 'config.js');
				let configDest = path.resolve(distFolder, 'config.js');

				fs.copy(configSrc, configDest, error => {
					if (error) { throw new Error(error); }

					spinner.stop();

					if (argv.verbose) {
						console.log(details);
						console.log();
					}

					console.log(chalk.green.bold('Application built with success :)'));
				});
			});
		});
	} catch (error) {
		spinner.stop();

		errorHandler('build', error);
	}
};