let chalk = require('chalk');
let pkg = require('../../package.json');

module.exports = function() {
	console.log(' ', chalk.cyan(pkg.name + ' - ' + pkg.version));
};