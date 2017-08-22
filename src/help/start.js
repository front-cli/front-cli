module.exports = function() {
	console.log('  Usage:\n');
	console.log('      cd <appName>');
	console.log('      front start');

	console.log();

	console.log('  Options:\n');
	console.log('      --host         changes the development server host');
	console.log('      --port         changes the development server port');
	console.log('      --no-notify    disables compilation notifications');
	console.log('      --config       specifies which webpack config file to use (default: build/webpack.config.dev.js)');
};