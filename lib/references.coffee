###
Utility for dealing with reference fields
###

# Deps
merge = require 'lodash/merge'
module.exports = {}

# Settings
MAX_DEPTH = 20

# Take an array of references (that may be empty or undefined), filter out
# the broken references (like where only the link with no fields is returned),
# and then return just the attributes, merging in the id and dates
module.exports.refs = (entries) ->
	(entries || [])
		.filter (entry) -> entry?.fields
		.map (entry) -> ref entry

# Merge id, dates, and sys into the fields, maintaining reactivity
module.exports.ref = ref = (entry, parents = []) ->

	# Require fields
	return undefined unless entry?.fields

	# Prevent infinite loops since Contentful JSON can be recursive
	return undefined if parents.includes entry.sys.id
	return undefined if parents.length >= MAX_DEPTH

	# Recurse through the object and apply ref to child references
	Object.keys(entry.fields).reduce (output, key) ->
		value = entry.fields[key]

		# If the value is an array, apply ref to any items that look like entries.
		# I've found the linkType property to exist only on draft entries that
		# are children of a published entry when using live API keys.
		if Array.isArray value
			value = value.map (item) ->
				if item?.sys?.type == 'Entry' or item?.sys?.linkType == 'Entry'
				then ref item, parents.concat [entry.sys.id]
				else item

			# Remove invalid entries for easier iterating
			.filter (item) -> item != undefined

		# If the value looks like an entry, get the ref of it
		else if value?.sys?.type == 'Entry'
			value = ref value, parents.concat [entry.sys.id]

		# Merge the value into the output object
		output[key] = value
		return output

	# Merge into an object containing the most commonly used aspects of sys
	, {
		id: entry.sys.id
		createdAt: entry.sys.createdAt
		updatedAt: entry.sys.updatedAt
		sys: entry.sys
	}
