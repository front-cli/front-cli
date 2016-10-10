let chalk = require('chalk');
let pkg = require('../../package.json');

module.exports = function(argv) {
	let task = argv._[1];

	switch (task) {
		case 'init':
		case 'start':
		case 'build':
		case 'deploy':
			return require('../help/' + task)(argv);
		break;

		default:
			console.log(chalk.red('Task not found'));
	}
};