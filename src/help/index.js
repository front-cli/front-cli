module.exports = function() {
	require('./version')();

	console.log();

	console.log('  Usage:\n');
	console.log('      front <task> [options]');

	console.log();

	console.log('  Tasks:\n');
	console.log('      init            creates a new project');
	console.log('      start           runs the project in development mode');
	console.log('      build           builds the project for production');
	console.log('      run <script>    run the specified <script>');
	console.log('      help <task>     shows the <task> help');

	console.log();

	console.log('  Options:\n');
	console.log('      --help, -h       shows this help');
	console.log('      --version, -v    shows the version');
};