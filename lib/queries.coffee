###
Helpers to build reusuable queries
###

# Deps
defaults = require 'lodash/defaults'
merge = require 'lodash/merge'
client = require './client-factory'

# Gonna export an object
module.exports = {}

# Get a list of entries given a content type
module.exports.getEntries = (contentType, options = {}) ->
	client = getClient()
	client.getEntries defaults options,
		content_type: contentType

# Get a paginateed list of entries, supporting a different number of results
# on the first page.
module.exports.getPaginatedEntries = (contentType, {
	page = 1,
	perPage = 12,
	initialPerPage = null}, options = {}) ->

	# Set default initial per apge
	initialPerPage = perPage unless initialPerPage

	# Form pagination query
	query = defaults options,
		order: '-fields.date'
		skip: if page == 1 then 0 else (page - 2) * perPage + initialPerPage
		limit: if page == 1 then initialPerPage else perPage

	# Run the query
	module.exports.getEntries contentType, query

# Get a single item
module.exports.getEntry = (contentType, query = {}) ->
	client = getClient()
	entry = await client.getEntries defaults query,
		content_type: contentType
		limit: 1
	if entry.items.length
		fields = entry.items[0].fields
		fields.id = entry.items[0].sys.id
		fields.createdAt = entry.items[0].sys.createdAt
		fields.updatedAt = entry.items[0].sys.updatedAt
		return fields

# Get an entry by slug
module.exports.getEntryBySlug = (contentType, slug, query = {}) ->
	await module.exports.getEntry contentType,
		'fields.slug': slug
