# Deps
merge = require 'lodash/merge'

# Lib includes
makeClient = require './lib/client-factory'

# We will export an object
module.exports = {}

# Accept the API configuration and create the client instance
module.exports.config = (options) ->
	module.exports.client = makeClient options

# Merge additional functions into library
module.exports.merge = ->
