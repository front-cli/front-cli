let path = require('path');
let errorHandler = require('../utils/errorHandler');

module.exports = function(argv) {
	try {
		let deployScriptPath = path.resolve(process.cwd(), `build/deploy.js`);

		require(deployScriptPath)(require, argv);

	} catch (error) {
		errorHandler('deploy', error);
	}
};