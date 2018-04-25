# Build the contentful client
contentful = require 'contentful'
module.exports = (options) -> contentful.createClient
	space: options.space
	accessToken: options.access_token
	host: options.host || 'cdn.contentful.com'
