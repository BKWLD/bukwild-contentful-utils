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
    ['bukwild-contentful-utils', {
      config: {
        space: process.env.CONTENTFUL_SPACE
        access_token: process.env.CONTENTFUL_API
        host: process.env.CONTENTFUL_HOST
      },
      merge: {

        customHelper: function({ client }) {
          return function() {
          }

        }
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
{ image } = require('bukwild-contentful-utils')
image(entry.image, 500, 300, { quality: 60 })
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

### SEO

A helper for setting seo-related fields in [Nuxt's `head` property](https://nuxtjs.org/api/configuration-head/).  This assumes you've created a Contentful content model for SEO fields that has the following fields:

- `title`
- `description`
- `image` (file, used for open graph image)
- `robots` (radios, may be `noindex`, `nofollow`, `noarchive` )
- `canonical` (text, canonical url)

#### Example

```js
{ seo, getEntryBySlug } = require('bukwild-contentful-utils')
export default {

  // Fetch an article which has a reference field called "seo" that is our SEO
  // content model
  asyncData: async function() {
    return {
      article: await getEntryBySlug('article', 'my-slug')
    }
  },

  // Use the SEO helper, passing in default SEO values from the article that
  // will be used if SEO options are not supplied
  head: function() {
    return seo(this.article.seo, {
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
