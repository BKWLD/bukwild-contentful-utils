'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var contentful = _interopDefault(require('contentful'));
var queryString = _interopDefault(require('query-string'));
var isObject = _interopDefault(require('lodash/isObject'));
require('lodash/merge');

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

// Build the contentful client
var contentful$1;

contentful$1 = contentful;

var clientFactory = function(options) {
  return contentful$1.createClient({
    space: options.space,
    accessToken: options.access_token,
    host: options.host || 'cdn.contentful.com'
  });
};

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
var isObject$1;

isObject$1 = isObject;

var seo = function(seo = {}, defaults) {
  var ref;
  // Merge seo reference on the entry (which may be absent) with an object of
  // default values pulled from an entry.
  seo = Object.assign({}, defaults, seo.fields || {});
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

var bukwildContentfulUtils = createCommonjsModule(function (module) {
// Deps
var makeClient;

// We will export an object
module.exports = {};

// Accept the API configuration and create the client instance
makeClient = clientFactory;

module.exports.config = function(options) {
  return module.exports.client = makeClient(options);
};

// Merge additional functions into library
module.exports.merge = function() {};

// Add image helper
module.exports.image = image;

// Add seo helper
module.exports.seo = seo;
});
var bukwildContentfulUtils_1 = bukwildContentfulUtils.config;
var bukwildContentfulUtils_2 = bukwildContentfulUtils.client;
var bukwildContentfulUtils_3 = bukwildContentfulUtils.merge;
var bukwildContentfulUtils_4 = bukwildContentfulUtils.image;
var bukwildContentfulUtils_5 = bukwildContentfulUtils.seo;

exports.default = bukwildContentfulUtils;
exports.config = bukwildContentfulUtils_1;
exports.client = bukwildContentfulUtils_2;
exports.merge = bukwildContentfulUtils_3;
exports.image = bukwildContentfulUtils_4;
exports.seo = bukwildContentfulUtils_5;
