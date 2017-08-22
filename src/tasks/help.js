module.exports = function(argv) {
	let task = argv._[1];

	switch (task) {
		case 'init':
		case 'start':
		case 'build':
			require('../help/' + task)(argv);
			break;

		default:
			require('../help')();
	}
};