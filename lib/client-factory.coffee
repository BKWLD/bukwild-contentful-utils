# Build the contentful client
once = require 'lodash/once'
contentful = require 'contentful'
module.exports = once (options) -> contentful.createClient
	space: options.space
	accessToken: options.access_token
	host: options.host || 'cdn.contentful.com'
	timeout: options.timeout || 30000 # The default
