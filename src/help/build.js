module.exports = function() {
	console.log('  Usage:\n');
	console.log('      cd <appName>');
	console.log('      front build');

	console.log();

	console.log('  Options:\n');
	console.log('      --no-notify    disables compilation notifications');
	console.log('      --verbose      shows compilation details');
	console.log('      --config       specifies which webpack config file to use (default: build/webpack.config.prod.js)');
};