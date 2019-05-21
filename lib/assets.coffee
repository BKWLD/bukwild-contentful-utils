###
Util to make formatting images easier
###
queryString = require 'query-string'
module.exports = {}

# Apply crop rules to an image
module.exports.img = (field, width, height, options = {}) ->

	# Make sure that a valid field was passed
	return unless url = module.exports.url field

	# Create query params
	params = {}
	params.w = width
	params.h = height
	params.fm = options.format if options.format
	params.q = options.quality || (90 if params.fm == 'jpg')
	params.fl = 'progressive' if params.fm == 'jpg'
	params.fit = options.fit if options.fit

	# Make the URL
	"#{url}?#{queryString.stringify(params)}"
	
# Return the aspect ratio of an image
module.exports.aspect = (field) ->
	
	# Make sure that a valid field was passed
	return unless image = field?.fields?.file?.details?.image
	
	# Make the aspect ratio
	{ width, height } = image
	return width / height
	
# Get the file url for a reference, which may not exist
module.exports.url = (field) -> field?.fields?.file?.url