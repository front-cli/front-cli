let request = require('request');

module.exports = function (callback) {
	let url = 'https://api.github.com/users/front-templates/repos';
	let headers = { 'User-Agent': 'front-cli' };

	request({ url, headers }, (error, response, data) => {
		if (error) { return callback(error); }

		callback(null, JSON.parse(data));
	});
};