let _ = require('underscore');
let fs = require('fs-extra');

function replaceFileContent(file, data) {
	let content = fs.readFileSync(file, 'utf8');

	content = _.template(content)(data);

	fs.outputFileSync(file, content);
}

module.exports = function(folder, data, callback) {
	let files = [];
	let re = /(node_modules|\.eot|\.woff2?|\.ttf|\.svg|\.png|\.jpg|\.jpeg|\.bmp|\.ico)/i;

	fs.walk(folder)
		.on('data', item => {
			if (!item.path.match(re)) {
				let isFile = fs.statSync(item.path).isFile();

				if (isFile) {
					files.push(item.path);
				}
			}
		})
		.on('end', () => {
			try {
				files.forEach(file => replaceFileContent(file, data));

				return callback(null);
			} catch(error) {
				return callback(error);
			}
		});
};