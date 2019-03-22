###
Util to make formatting images easier
###
queryString = require 'query-string'
module.exports = {}

# Apply crop rules to an image
module.exports.img = (field, width, height, options = {}) ->

	# Make sure that a valid field was passed
	return unless url = field?.fields?.file?.url

	# Create query params
	params = {}
	params.w = width
	params.h = height
	params.fm = options.format if options.format
	params.q = options.quality || (90 if params.fm == 'jpg')
	params.fl = 'progressive' if params.fm == 'jpg'

	# Make the URL
	"#{url}?#{queryString.stringify(params)}"

# Return the aspect ratio of an image
module.exports.aspect = (field) ->
	
	# Make sure that a valid field was passed
	return unless image = field?.fields?.file?.details?.image
	
	# Make the aspect ratio
	{ width, height } = image
	return width / height