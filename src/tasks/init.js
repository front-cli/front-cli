let fs = require('fs-extra');
let path = require('path');
let chalk = require('chalk');
let ora = require('ora');
let _ = require('underscore');
let pkg = require('../templates/package.json');
let errorHandler = require('../utils/errorHandler');

function folderIsEmpty(folder) {
	try {
		return fs.readdirSync(folder).length === 0;
	} catch (error) {
		return true;
	}

	return false;
}

function replaceFileContent(file, data) {
	let content = fs.readFileSync(file, 'utf8');

	content = _.template(content)(data);

	fs.outputFileSync(file, content);
}

module.exports = function(argv) {
	let appName = argv._[1] || path.basename(process.cwd());
	let root = argv._[1] ? path.join(process.cwd(), appName) : process.cwd();
	let spinner = ora('Creating application').start();

	try {
		if (!folderIsEmpty(root)) {
			throw new Error('Destination folder is not empty');
		}

		fs.copy(path.resolve(__dirname, '../templates'), root, () => {
			let files = [];
			let re = /(node_modules|\.eot|\.woff2?|\.ttf|\.svg|\.png|\.jpg|\.jpeg|\.bmp|\.ico)/i;

			fs.walk(root)
				.on('data', item => {
					if (!item.path.match(re)) {
						let isFile = fs.statSync(item.path).isFile();

						if (isFile) {
							files.push(item.path);
						}
					}
				})
				.on('end', () => {
					let data = _.extend(pkg, { appName });

					files.forEach(file => replaceFileContent(file, data));

					spinner.stop();

					console.log(chalk.green('Application created!'));
				});
		});
	} catch(error) {
		spinner.stop();

		errorHandler('init', error);
	};
};