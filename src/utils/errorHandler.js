let chalk = require('chalk');

let errorMessages = {
	init: 'An error occurred while creating the application!',
	start: 'An error occurred while starting the application! Are you in a wrong folder, maybe?',
	build: 'An error occurred while building the application! Are you in a wrong folder, maybe?',
	deploy: 'An error occurred while deploying the application! Are you in a wrong folder, maybe?'
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