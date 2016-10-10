module.exports = function() {
	require('./version')();

	console.log();

	console.log('  Usage:\n');
	console.log('      front <task> [options]');

	console.log();

	console.log('  Tasks:\n');
	console.log('      init           create a new application');
	console.log('      start          run the application in development mode');
	console.log('      build          build the application for production');
	console.log('      deploy         deploy the application');
	console.log('      help <task>    show task help');

	console.log();

	console.log('  Options:\n');
	console.log('      --help, -h       show this help');
	console.log('      --version, -v    show the version');
};