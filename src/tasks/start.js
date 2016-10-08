let path = require('path');
let toArgv = require('object-to-argv');
let exec = require('child_process').spawn;

module.exports = function(argv) {
	let command = path.resolve(__dirname, '../../node_modules/.bin/webpack-dev-server');
	let config = path.resolve(process.cwd(), 'build/webpack.config.dev.js');

	argv.port = argv.port || 3000;
	argv.config = argv.config || config;

	if (argv.hot === undefined) {
		argv.hot = true;
	}

	if (argv.inline === undefined) {
		argv.inline = true;
	}

	if (argv.colors === undefined) {
		argv.colors = true;
	}

	if (argv.progress === undefined) {
		argv.progress = true;
	}

	let proc = exec(command, toArgv(argv), { stdio: 'inherit', shell: true });
};