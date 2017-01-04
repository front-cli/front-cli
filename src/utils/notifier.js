let path = require('path');
let notifier = require('node-notifier');

module.exports = function() {
	let pkg = require(path.resolve(process.cwd(), 'package.json'));
	let successIcon = path.resolve(__dirname, '../../logo/compilation-success.png');
	let errorIcon = path.resolve(__dirname, '../../logo/compilation-error.png');

	return {
		notify(message, type = 'success') {
			let icon = successIcon;

			if (type === 'error') {
				icon = errorIcon;
			}

			notifier.notify({
				title: 'Front [' + pkg.name + ']',
				message: message,
				icon: icon,
				sound: true,
				time: 5000
			});
		},

		apply(compiler) {
			compiler.plugin('done', (stats) => {
				let time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);
				let successMessage = '[SUCCESS] Compiled in ' + time + 's.';
				let errorMessage = '[ERROR] Details in terminal.';

				this.notify(stats.hasErrors() ? errorMessage : successMessage, stats.hasErrors() ? 'error' : 'success');
			});
		}
	};
};