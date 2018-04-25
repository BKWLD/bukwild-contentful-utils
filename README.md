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

```js
{ image } = require('bukwild-contentful-utils')
image(entry.image, 500, 300, { quality: 60 })
```

#### API

- `image(field:Object, width:Integer, height:Integer, options:Object)`
  - `fieldName` : The property on an entry result from Contentful for the image
  - `width` : The desired image width
  - `height`: The desired image height
  - `options`
    - `format` : Image format, defaults to 'jpg'
    - `quality`: Image quality, defaults to `90` if a jpg

#### Notes

- JPGs will be progressive
- Returns `null` if no image has been defined
