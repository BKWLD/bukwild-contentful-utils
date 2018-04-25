'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var once = _interopDefault(require('lodash/once'));
var contentful = _interopDefault(require('contentful'));
var queryString = _interopDefault(require('query-string'));
var isObject = _interopDefault(require('lodash/isObject'));
var merge = _interopDefault(require('lodash/merge'));
var defaults = _interopDefault(require('lodash/defaults'));

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// Build the contentful client
var contentful$1, once$1;

once$1 = once;

contentful$1 = contentful;

var clientFactory = once$1(function(options) {
  return contentful$1.createClient({
    space: options.space,
    accessToken: options.access_token,
    host: options.host || 'cdn.contentful.com'
  });
});

/*
Util to make formatting images easier
*/
var queryString$1;

queryString$1 = queryString;

var image = function(field, width, height, options = {}) {
  var params, ref, ref1, url;
  // Make sure that a valid field was passed
  if (!(field != null ? (ref = field.fields) != null ? (ref1 = ref.file) != null ? ref1.url : void 0 : void 0 : void 0)) {
    return;
  }
  // Create query params
  params = {};
  params.w = width;
  params.h = height;
  params.fm = options.format || 'jpg';
  params.q = options.quality || (params.fm === 'jpg' ? 90 : void 0);
  if (params.fm === 'jpg') {
    params.fl = 'progressive';
  }
  // Make the URL
  url = field.fields.file.url;
  return `${url}?${queryString$1.stringify(params)}`;
};

/*
A helper for making the Nuxt head from a contentful SEO entry
*/
var isObject$1, merge$1;

isObject$1 = isObject;

merge$1 = merge;

var seo = function(seo = {}, defaults$$1) {
  var ref;
  // Merge seo reference on the entry (which may be absent) with an object of
  // default values pulled from an entry.
  seo = merge$1({}, defaults$$1, seo.fields || {});
  if ((seo != null ? seo.image : void 0) && isObject$1(seo.image)) {
    // Get the image URL from raw image fields
    seo.image = seo.image.fields.file.url;
  }
  if ((seo != null ? seo.image : void 0) && !seo.image.match(/^http/)) {
    // Append protocol to images
    seo.image = `https:${seo.image}`;
  }
  return {
    /*
    Return an object for Nuxt's head
    */
    // The page title
    title: seo.title,
    // Meta fields
    meta: [
      seo.title ? {
        hid: 'og:title',
        property: 'og:title',
        content: seo.title
      } : void 0,
      seo.description ? {
        hid: 'description',
        name: 'description',
        content: seo.description
      } : void 0,
      seo.image ? {
        hid: 'og:image',
        property: 'og:image',
        content: seo.image
      } : void 0,
      seo.robots ? {
        hid: 'robots',
        name: 'robots',
        content: (ref = seo.robots) != null ? ref.join(', ') : void 0
      } : void 0
    ].filter(function(v) {
      return !!v; // Remove empties
    }),
    
    // Link attributees
    link: [
      seo.canonical ? {
        hid: 'canonical',
        rel: 'canonical',
        link: seo.canonical
      } : void 0
    ].filter(function(v) {
      return !!v; // Remove empties
    })
  };
};

var queries = createCommonjsModule(function (module) {
/*
Helpers to build reusuable queries
*/
var defaults$$1, getClient;

// Deps
defaults$$1 = defaults;

getClient = clientFactory;

// Gonna export an object
module.exports = {};

// Get a list of entries given a content type
module.exports.getEntries = function(contentType, options = {}) {
  var client;
  client = getClient();
  return client.getEntries(defaults$$1(options, {
    content_type: contentType
  }));
};

// Get a paginateed list of entries, supporting a different number of results
// on the first page.
module.exports.getPaginatedEntries = function(contentType, {page = 1, perPage = 12, initialPerPage = null}, options = {}) {
  var query;
  if (!initialPerPage) {
    // Set default initial per apge
    initialPerPage = perPage;
  }
  // Form pagination query
  query = defaults$$1(options, {
    order: '-fields.date',
    skip: page === 1 ? 0 : (page - 2) * perPage + initialPerPage,
    limit: page === 1 ? initialPerPage : perPage
  });
  // Run the query
  return module.exports.getEntries(contentType, query);
};

// Get a single item
module.exports.getEntry = async function(contentType, query = {}) {
  var client, entry, fields;
  client = getClient();
  entry = (await client.getEntries(defaults$$1(query, {
    content_type: contentType,
    limit: 1
  })));
  if (entry.items.length) {
    fields = entry.items[0].fields;
    fields.id = entry.items[0].sys.id;
    fields.createdAt = entry.items[0].sys.createdAt;
    fields.updatedAt = entry.items[0].sys.updatedAt;
    return fields;
  }
};

// Get an entry by slug
module.exports.getEntryBySlug = async function(contentType, slug, query = {}) {
  return (await module.exports.getEntry(contentType, {
    'fields.slug': slug
  }));
};
});
var queries_1 = queries.getEntries;
var queries_2 = queries.getPaginatedEntries;
var queries_3 = queries.getEntry;
var queries_4 = queries.getEntryBySlug;

var bukwildContentfulUtils = createCommonjsModule(function (module) {
var makeClient, merge$$1, queries$$1;

merge$$1 = merge;

// We will export an object
module.exports = {};

// Accept the API configuration and create the client instance
makeClient = clientFactory;

module.exports.client = {}; // Needed for the client to be added later

module.exports.config = function(options) {
  return merge$$1(module.exports, {
    client: makeClient(options)
  });
};

// Add image helper
module.exports.image = image;

// Add seo helper
module.exports.seo = seo;

// Add querying helpers
queries$$1 = queries;

module.exports.getEntries = queries$$1.getEntries;

module.exports.getPaginatedEntries = queries$$1.getPaginatedEntries;

module.exports.getEntry = queries$$1.getEntry;

module.exports.getEntryBySlug = queries$$1.getEntryBySlug;
});
var bukwildContentfulUtils_1 = bukwildContentfulUtils.client;
var bukwildContentfulUtils_2 = bukwildContentfulUtils.config;
var bukwildContentfulUtils_3 = bukwildContentfulUtils.image;
var bukwildContentfulUtils_4 = bukwildContentfulUtils.seo;
var bukwildContentfulUtils_5 = bukwildContentfulUtils.getEntries;
var bukwildContentfulUtils_6 = bukwildContentfulUtils.getPaginatedEntries;
var bukwildContentfulUtils_7 = bukwildContentfulUtils.getEntry;
var bukwildContentfulUtils_8 = bukwildContentfulUtils.getEntryBySlug;

exports.default = bukwildContentfulUtils;
exports.client = bukwildContentfulUtils_1;
exports.config = bukwildContentfulUtils_2;
exports.image = bukwildContentfulUtils_3;
exports.seo = bukwildContentfulUtils_4;
exports.getEntries = bukwildContentfulUtils_5;
exports.getPaginatedEntries = bukwildContentfulUtils_6;
exports.getEntry = bukwildContentfulUtils_7;
exports.getEntryBySlug = bukwildContentfulUtils_8;
