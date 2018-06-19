###
Util to make formatting images easier
###
queryString = require 'query-string'
module.exports = (field, width, height, options = {}) ->

	# Make sure that a valid field was passed
	return unless field?.fields?.file?.url

	# Create query params
	params = {}
	params.w = width
	params.h = height
	params.q = options.quality || (90 if params.fm == 'jpg')
	params.fl = 'progressive' if params.fm == 'jpg'

	# Make the URL
	url = field.fields.file.url
	"#{url}?#{queryString.stringify(params)}"
