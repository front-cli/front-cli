let fs = require('fs-extra');
let path = require('path');
let chalk = require('chalk');
let getTemplate = require('../utils/getTemplate');

module.exports = function(argv) {
	let appName = argv._[1];
	let root = path.join(process.cwd(), appName);
	let files = [
		['application/initializer.js', 'initializer.js'],
		['application/main.js', 'main.js'],
		['application/routes.js', 'routes.js'],
		['application/components/.gitkeep', ''],
		['application/helpers/.gitkeep', ''],
		['application/mixins/.gitkeep', ''],
		['application/models/.gitkeep', ''],
		['application/views/commons/layout.vue', 'layout.vue'],
		['application/views/commons/header.vue', 'header.vue'],
		['application/views/commons/footer.vue', 'footer.vue'],
		['application/views/commons/home.vue', 'home.vue'],
		['application/views/commons/404.vue', '404.vue'],
		['assets/css/main.css', 'main.css'],
		['assets/img/logo.png', 'logo.png'],
		['build/webpack.config.dev.js', 'webpack.config.dev.js'],
		['build/webpack.config.prod.js', 'webpack.config.prod.js'],
		['.gitignore', '.gitignore'],
		['config.js', 'config.js'],
		['favicon.ico', 'favicon.ico'],
		['index.html', 'index.html'],
		['package.json', 'package.json'],
		['node_modules', 'node_modules']
	];

	try {
		files.forEach(function(file) {
			let [filepath, template] = file;
			let toCopy = template.match(/(node_modules|\.ico|\.png)/);

			if (toCopy) {
				fs.copySync(path.resolve(__dirname, `../templates/${template}`), path.join(root, filepath));
			} else {
				template = template ? getTemplate(template, { appName }) : template;

				fs.outputFileSync(path.join(root, filepath), template);
			}
		});

		console.log(chalk.green('Application created!'));
	} catch(error) {
		console.log(chalk.red('An error occurred:'));
		console.log();
		console.log(error);
	};
};