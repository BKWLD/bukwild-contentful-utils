/**
 * Register the directive
 */
const path = require('path')
const serialize = require('serialize-javascript')
module.exports = function (options) {
	this.addPlugin({
		src: path.resolve(__dirname, 'plugin.js'),
		options: serialize(options),
	});
}

// Export meta for Nuxt
module.exports.meta = require('../package.json')
