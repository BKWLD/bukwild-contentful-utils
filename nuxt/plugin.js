// Deps
const Vue = require('vue')
const serialize = require('serialize-javascript')
const utils = require('bukwild-contentful-utils/index.js')

// Extract serialized options
options = eval(<%= options %>)

// Configure the API
utils.config(options.config)

// Inject the utils into the app
module.exports = function(ctx, inject) {
	inject('contentfulWip', utils)
}
