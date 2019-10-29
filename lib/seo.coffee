###
A helper for making the Nuxt head from a contentful SEO entry
###
isObject = require 'lodash/isObject'
merge = require 'lodash/merge'
module.exports = (seo = {}, defaults) ->

	# Merge seo reference on the entry (which may be absent) with an object of
	# default values pulled from an entry.
	seo = merge {}, defaults, seo.fields || {}

	# Get the image URL from raw image fields
	seo.image = seo.image.fields.file.url if seo?.image and isObject seo.image

	# Append protocol to images
	seo.image = "https:#{seo.image}" if seo?.image and not seo.image.match /^http/

	###
	Return an object for Nuxt's head
	###

	# The page title
	title: seo.title

	# Meta fields
	meta: [
		{
			hid: 'og:title'
			property: 'og:title'
			content: seo.title
		} if seo.title
		{
			hid: 'description'
			name: 'description'
			content: seo.description
		} if seo.description
		{
			hid: 'og:image'
			property: 'og:image'
			content: seo.image
		} if seo.image
		{
			hid: 'robots'
			name: 'robots'
			content: seo.robots?.join(', ')
		} if seo.robots
	].filter (v) -> !!v # Remove empties

	# Link attributees
	link: [
		{
			hid: 'canonical'
			rel: 'canonical'
			href: seo.canonical
		} if seo.canonical
	].filter (v) -> !!v # Remove empties
