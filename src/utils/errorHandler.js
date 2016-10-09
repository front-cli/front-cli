let chalk = require('chalk');

module.exports = function (message) {
	return function(details) {
		console.log(chalk.red(message));

		if (details) {
			console.log();
			console.log(chalk.gray('Error details:'));
			console.log();
			console.log(details);
		}
	};
};