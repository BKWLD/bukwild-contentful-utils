// Deps
const Vue = require('vue')
const serialize = require('serialize-javascript')
const utils = require('bukwild-contentful-utils/index.js')

// Extract serialized options
options = eval(<%= options %>)

// Configure the API
utils.config(options.api)

// Merge additional functions in
utils.merge(options.merge)

// Inject the utils into the app
module.exports = function(ctx, inject) {
	inject('wip', utils)
}
