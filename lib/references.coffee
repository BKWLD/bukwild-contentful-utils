###
Utility for dealing with reference fields
###

# Deps
module.exports = {}

# Take an array of references (that may be empty or undefined), filter out
# the broken references (like where only the link with no fields is returned),
# and then return just the attributes, merging in the id and dates
module.exports.refs = (entries) ->
	(entries || [])
		.filter (entry) -> entry.fields
		.map (entry) -> module.exports.ref entry

# Merge id, dates, and sys into the fields, maintining reactivity
module.exports.ref = (entry) ->
	fields = entry.items[0].fields
	fields.id = entry.items[0].sys.id
	fields.createdAt = entry.items[0].sys.createdAt
	fields.updatedAt = entry.items[0].sys.updatedAt
	return fields
