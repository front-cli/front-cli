let fs = require('fs-extra');
let path = require('path');
let chalk = require('chalk');
let ora = require('ora');
let inquirer = require('inquirer');
let listTemplatesRepositories = require('../utils/listTemplatesRepositories');
let downloadGitRepo = require('download-git-repo');
let replacer = require('../utils/replacer');
let errorHandler = require('../utils/errorHandler');

function folderIsEmpty(folder) {
	try {
		return fs.readdirSync(folder).length === 0;
	} catch (error) {
		return true;
	}
}

module.exports = function(argv) {
	let appName = argv._[1] || path.basename(process.cwd());
	let root = argv._[1] ? path.join(process.cwd(), appName) : process.cwd();
	let spinner = ora('Creating application');

	try {
		if (!folderIsEmpty(root)) {
			throw new Error(`${appName} folder is not empty`);
		}

		listTemplatesRepositories((error, repositories) => {
			if (error) {
				return errorHandler('init', error);
			}

			let templateChoices = [];

			repositories.forEach(repo => {
				templateChoices.push({ name: repo.description, value: repo.full_name });
			});

			let questions = [{
				type: 'list',
				name: 'appTemplate',
				message: 'Choose a template:',
				choices: templateChoices
			}];

			inquirer.prompt(questions).then(({ appTemplate }) => {
				console.log();

				spinner.start();

				downloadGitRepo(appTemplate, root, error => {
					if (error) {
						spinner.stop();

						fs.emptyDirSync(root);

						return errorHandler('init', error);
					}

					replacer(root, { appName }, error => {
						if (error) {
							spinner.stop();

							fs.emptyDirSync(root);

							return errorHandler('init', error);
						}

						spinner.stop();

						console.log(chalk.green.bold('Application created!'));
					});
				});
			});
		});
	} catch(error) {
		spinner.stop();

		errorHandler('init', error);
	}
};