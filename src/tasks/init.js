let fs = require('fs-extra');
let path = require('path');
let chalk = require('chalk');
let ProgressBar = require('progress');
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
	let dest = argv._[1] ? path.join(process.cwd(), appName) : process.cwd();
	let progress = new ProgressBar(`0% ${chalk.green.bold(':bar')} 100% (:elapsed seconds)`, {
		incomplete: ' ',
		complete: '■',
		width: 20,
		total: 100,
		clear: false
	});
	let timer;

	function downloadTemplate(repoPath) {
		timer = setInterval(() => {
			if (progress.complete) {
				clearInterval(timer);
				console.log();
			} else {
				progress.tick(2.5);
			}
		}, 1000);

		downloadGitRepo(repoPath, dest, error => {
			progress.tick(100);

			if (error) {
				fs.emptyDirSync(dest);

				return errorHandler('init', error);
			}

			replacer(dest, { appName }, error => {
				if (error) {
					fs.emptyDirSync(dest);

					return errorHandler('init', error);
				}

				console.log(chalk.green.bold('Created!'));
			});
		});
	}

	try {
		if (!folderIsEmpty(dest)) {
			throw new Error(`${appName} folder is not empty`);
		}

		if (typeof(argv.template) === 'string' && argv.template !== '') {
			return downloadTemplate(argv.template);
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

				return downloadTemplate(appTemplate);
			});
		});
	} catch(error) {
		progress.tick(100);

		errorHandler('init', error);
	}
};