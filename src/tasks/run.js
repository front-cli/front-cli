let path = require('path');
let errorHandler = require('../utils/errorHandler');

module.exports = function(argv) {
	try {
		let scriptPath = path.resolve(process.cwd(), argv._[1]);

		require(scriptPath)(require, argv);
	} catch (error) {
		errorHandler('run', error);
	}
};