/**
 * Nuxt loses the current directory at this point, so I had to refer to the
 * the directive src file through the module name.
 *
 * Also, I can't passthrough objects directly from module.js to here so I'm
 * serializing it and then parsing it back out so I can send arrays through to
 * the directive.
 */
const Vue = require('vue')
const serialize = require('serialize-javascript')
const utils = require('bukwild-contentful-utils/index.coffee')

// Merge addition utils in
options = eval(<%= options %>)
utils.merge(options)

// Inject the utils into the app
module.exports = function(ctx, inject) {
	inject('wip', utils)
}
