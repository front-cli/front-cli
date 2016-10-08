#!/usr/bin/env node

let chalk = require('chalk');
let pkg = require('./package.json');
let argv = require('minimist')(process.argv.slice(2));
let task = argv._[0] || '--help';

console.log(); // padding

switch (task) {
	case '--version':
	case '-v':
		require('./src/tasks/version')();
	break;

	case '--help':
	case '-h':
		require('./src/tasks/help')();
	break;

	case 'init':
	case 'start':
	case 'build':
	case 'deploy':
		return require('./src/tasks/' + task)(argv);
	break;

	default:
		console.log(chalk.red('Task or option not found'));
}