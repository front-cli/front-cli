let chalk = require('chalk');
let fs = require('fs-extra');
let path = require('path');
let compiler = require('../utils/compiler');
let errorHandler = require('../utils/errorHandler');

module.exports = function(argv) {
	let distFolder = path.resolve(process.cwd(), 'dist');

	argv.notify = argv.notify !== undefined ? argv.notify : true;
	argv.config = argv.config ? path.resolve(argv.config) : path.resolve(process.cwd(), 'build/webpack.config.prod.js');

	try {
		fs.remove(distFolder, error => {
			if (error) { throw new Error(error); }

			return compiler('prod', argv, (hasErrors, details) => {
				if (hasErrors) {
					return errorHandler('build', details);
				}

				if (argv.verbose) {
					console.log(details);
					console.log();
				}

				console.log(chalk.green.bold('Success :)'));
			});
		});
	} catch (error) {
		errorHandler('build', error);
	}
};