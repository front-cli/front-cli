let chalk = require('chalk');

let errorMessages = {
	init: 'An error occurred while creating the project!',
	start: 'An error occurred while starting the project! Are you in a wrong folder, maybe?',
	build: 'An error occurred while building the project! Are you in a wrong folder, maybe?',
	proxy: 'An error occurred while configuring proxy rules!'
};

module.exports = function (type, details) {
	let message = errorMessages[type];

	console.log(chalk.red.bold(message));

	if (details) {
		console.log();
		console.log(chalk.bgRed.bold('Error details:'));
		console.log();
		console.log(details);
	}
};