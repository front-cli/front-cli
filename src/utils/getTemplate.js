let fs = require('fs-extra');
let _ = require('underscore');
let path = require('path');
let pkg = require('../templates/package.json');

module.exports = function(template, obj) {
	template = path.join(__dirname, '../templates', template);
	template = fs.readFileSync(template, 'utf8');

	return _.template(template)(_.extend(pkg, obj));
};