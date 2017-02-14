#!/usr/bin/env node
let chalk = require('chalk');
let argv = require('minimist')(process.argv.slice(2));
let task = process.argv.slice(2)[0] || '--help';

console.log(); // padding

switch (task) {
	case '--version':
	case '-v':
		require('./src/help/version')();
		break;

	case '--help':
	case '-h':
		require('./src/help')();
		break;

	case 'init':
	case 'start':
	case 'build':
	case 'deploy':
	case 'help':
		require('./src/tasks/' + task)(argv);
		break;

	default:
		console.log(chalk.red.bold('Task or option not found'));
}
