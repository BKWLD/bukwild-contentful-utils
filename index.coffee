# Deps
merge = require 'lodash/merge'

# We will export an object
module.exports = {}

# Accept the API configuration and create the client instance
makeClient = require './lib/client-factory'
module.exports.config = (options) ->
	module.exports.client = makeClient options

# Merge additional functions into library
module.exports.merge = ->

# Add image helper
module.exports.image = require './lib/image'

# Add seo helper
module.exports.seo = require './lib/seo'
