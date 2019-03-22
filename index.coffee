merge = require 'lodash/merge'

# We will export an object
module.exports = {}

# Accept the API configuration and create the client instance
makeClient = require './lib/client-factory'
module.exports.client = {} # Needed for the client to be added later
module.exports.config = (options) ->
	merge module.exports, client: makeClient options

# Add image helper
image = require './lib/image'
module.exports.img = image.img
module.exports.image = module.exports.img # Backwards compatibilty
module.exports.aspect = image.aspect

# Add seo helper
module.exports.seo = require './lib/seo'

# Add querying helpers
queries = require './lib/queries'
module.exports.getEntries = queries.getEntries
module.exports.getPaginatedEntries = queries.getPaginatedEntries
module.exports.getEntry = queries.getEntry
module.exports.getEntryBySlug = queries.getEntryBySlug

# Add references helpers
references = require './lib/references'
module.exports.refs = references.refs
module.exports.ref = references.ref
