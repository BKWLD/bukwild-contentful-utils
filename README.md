# bukwild-contentful-utils

Utilities for interacting with Contentful, designed with Vue and Nuxt in mind.

## Install

`yarn add bukwild-contentful-utils or npm install --save bukwild-contentful-utils`

## Configure

#### Vue

In a your bootstrapping JS:

```js
// Setup
utils = require('bukwild-contentful-utils')
utils.config({
  space: 'YOUR_CONTENTFUL_SPACE',
  access_token: 'YOUR_CONTENTFUL_ACCESS_TOKEN',
  host: 'OPTIONAL_CONTENTFUL_ENDPOINT', // Ex: "preview.contentful.com"
})
```

Then later, within components, access utils like:

```js
{ client } = require('bukwild-contentful-utils')
client.getEntries()
```

#### Nuxt

In `nuxt.config.js`:

```js
  modules: [
    ['bukwild-contentful-utils/nuxt/module', {
      config: {
        space: process.env.CONTENTFUL_SPACE
        access_token: process.env.CONTENTFUL_API
        host: process.env.CONTENTFUL_HOST
      }
    }]
  ]
```

Then later, within components, access utils like:

```js
// From a method that receives a Nuxt context
{
  asyncData: function ({ app }) {
    app.$contentful.client.getEntries()
  }
}

// ... or from regular Vue methods
{
  methods: {
    fetch: function ({ app }) {
      this.$contentful.client.getEntries()
    }
  }
}
```

## Usage

### Client

See the Configuration instructions for an example of how to get access to the raw Contentful client.


### Image

Helper method for creating Contentful URLs that transform images:

#### Example

```js
this.$contentful.image(entry.image, 500, 300, { quality: 60 })
```

#### API

`image(field:Object, width:Integer, height:Integer, options:Object)`
- `fieldName` : The property on an entry result from Contentful for the image
- `width` : The desired image width
- `height`: The desired image height
- `options`
  - `format` : Image format, defaults to 'jpg'
  - `quality`: Image quality, defaults to `90` if a jpg

#### Notes

- JPGs will be progressive
- Returns `null` if no image has been defined


### Queries

Some helper methods for querying Contentful

#### Example

```js
export default {
  asyncData: async function({ app, route }) {
    [ article, articles ] = await Promise.all([
      app.$contentful.getEntryBySlug('article', 'my-slug'),
      app.$contentful.getPaginatedEntries('article', {
        page: parseInt(route.query.page) || 1,
        perPage: 40,
      }),
    ])
    return { article, articles }
  },
}
```

#### APIs

`$contentful.getEntry(contentType:string, query:Object)`
- `contentType` : A Contentful content type
- `query` : Additional query options that will get merged

_Gets a single Entry, merging its id and create/update dates into the fields and returning *only* the fields themselves (not sys)_

`$contentful.getEntryBySlug(contentType:string, slug:String, query:Object)`
- `contentType` : A Contentful content type
- `slug` : A value should that match a `slug` property on the content model
- `query` : Additional query options that will get merged

_Like `getEntry`, but looks up by slug_

`$contentful.getEntries(contentType:string, query:Object)`
- `contentType` : A Contentful content type
- `query` : Additional query options that will get merged

_Get a list of entries for a given content type_

`$contentful.getPaginatedEntries(contentType:string, pagination:Object, query:Object)`
- `contentType` : A Contentful content type
- `pagination`
  - `page` : The current page number, defaults to `1`
  - `perPage` : How many to fetch per page, defaults to `12`
  - `initialPerPage` : Optionally set a different number of results on first page
- `query` : Additional query options that will get merged

_Get a slice of entries given pagination params_


### References

Helpers for dealing with references

#### Example

```js
export default {
  props: {
    block: Object,
  },
  template: `
    <ul><li
      v-for='resource in $contentful.refs(block.resources)'
      :key='resource.id'> {{ resource.name }}
    </li></ul>`
}
```

#### APIs

`$contentful.refs(entries:array)`
- `entries` : An array of reference entries (may be undefined)

_Take an array of references (that may be empty or undefined), filter out the broken references (like where only the link with no fields is returned), and then return just the attributes, merging in the id and dates_


### SEO

A helper for setting seo-related fields in [Nuxt's `head` property](https://nuxtjs.org/api/configuration-head/).  This assumes you've created a Contentful content model for SEO fields that has the following fields:

- `title`
- `description`
- `image` (file, used for open graph image)
- `robots` (radios, may be `noindex`, `nofollow`, `noarchive` )
- `canonical` (text, canonical url)

#### Example

```js
export default {

  // Fetch an article which has a reference field called "seo" that is our SEO
  // content model
  asyncData: async function({ app }) {
    return {
      article: await app.$contentful.getEntryBySlug('article', 'my-slug')
    }
  },

  // Use the SEO helper, passing in default SEO values from the article that
  // will be used if SEO options are not supplied
  head: function() {
    return this.$contentful.seo(this.article.seo, {
      title: this.article.title,
      description: this.article.abstract
    })
  },
}
```

#### API

`seo(seoReference:Object, defaults:Object)`
- `seoReference` : The property on your entry which contains the SEO content model reference
- `defaults` : An object whose values will be used in case the SEO content model is missing an attribute
