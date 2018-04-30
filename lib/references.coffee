###
Utility for dealing with reference fields
###

# Deps
merge = require 'lodash/merge'
module.exports = {}

# Take an array of references (that may be empty or undefined), filter out
# the broken references (like where only the link with no fields is returned),
# and then return just the attributes, merging in the id and dates
module.exports.refs = (entries) ->
	(entries || [])
		.filter (entry) -> entry.fields
		.map (entry) -> merge {}, entry.fields,
			id: entry.sys.id
			createdAt: entry.sys.createdAt
			updatedAt = entry.sys.updatedAt
