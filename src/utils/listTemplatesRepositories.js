let request = require('request');

module.exports = function (callback) {
	let url = 'https://api.github.com/users/front-templates/repos';
	let headers = { 'User-Agent': 'front-cli' };
	let qs = { 'order': 'created', 'direction': 'desc' };

	request({ url, headers, qs }, (error, response, data) => {
		if (error) { return callback(error); }

		callback(null, JSON.parse(data));
	});
};