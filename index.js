module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var makeClient, merge, queries, references;

merge = __webpack_require__(1);

// We will export an object
module.exports = {};

// Accept the API configuration and create the client instance
makeClient = __webpack_require__(2);

module.exports.client = {}; // Needed for the client to be added later

module.exports.config = function (options) {
  return merge(module.exports, {
    client: makeClient(options)
  });
};

// Add image helper
module.exports.img = __webpack_require__(5);

module.exports.image = module.exports.img; // Backwards compatibilty


// Add seo helper
module.exports.seo = __webpack_require__(7);

// Add querying helpers
queries = __webpack_require__(9);

module.exports.getEntries = queries.getEntries;

module.exports.getPaginatedEntries = queries.getPaginatedEntries;

module.exports.getEntry = queries.getEntry;

module.exports.getEntryBySlug = queries.getEntryBySlug;

// Add references helpers
references = __webpack_require__(11);

module.exports.refs = references.refs;

module.exports.ref = references.ref;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("lodash/merge");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Build the contentful client
var contentful, once;

once = __webpack_require__(3);

contentful = __webpack_require__(4);

module.exports = once(function (options) {
  return contentful.createClient({
    space: options.space,
    accessToken: options.access_token,
    host: options.host || 'cdn.contentful.com',
    timeout: options.timeout || 30000 // The default
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("lodash/once");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("contentful");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
Util to make formatting images easier
*/
var queryString;

queryString = __webpack_require__(6);

module.exports = function (field, width, height) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

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
  return url + '?' + queryString.stringify(params);
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
A helper for making the Nuxt head from a contentful SEO entry
*/
var isObject, merge;

isObject = __webpack_require__(8);

merge = __webpack_require__(1);

module.exports = function () {
  var seo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  var ref;
  // Merge seo reference on the entry (which may be absent) with an object of
  // default values pulled from an entry.
  seo = merge({}, defaults, seo.fields || {});
  if ((seo != null ? seo.image : void 0) && isObject(seo.image)) {
    // Get the image URL from raw image fields
    seo.image = seo.image.fields.file.url;
  }
  if ((seo != null ? seo.image : void 0) && !seo.image.match(/^http/)) {
    // Append protocol to images
    seo.image = 'https:' + seo.image;
  }
  return {
    /*
    Return an object for Nuxt's head
    */
    // The page title
    title: seo.title,
    // Meta fields
    meta: [seo.title ? {
      hid: 'og:title',
      property: 'og:title',
      content: seo.title
    } : void 0, seo.description ? {
      hid: 'description',
      name: 'description',
      content: seo.description
    } : void 0, seo.image ? {
      hid: 'og:image',
      property: 'og:image',
      content: seo.image
    } : void 0, seo.robots ? {
      hid: 'robots',
      name: 'robots',
      content: (ref = seo.robots) != null ? ref.join(', ') : void 0
    } : void 0].filter(function (v) {
      return !!v; // Remove empties
    }),

    // Link attributees
    link: [seo.canonical ? {
      hid: 'canonical',
      rel: 'canonical',
      link: seo.canonical
    } : void 0].filter(function (v) {
      return !!v; // Remove empties
    })
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("lodash/isObject");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
Helpers to build reusuable queries
*/
var defaults, getClient;

// Deps
defaults = __webpack_require__(10);

getClient = __webpack_require__(2);

// Gonna export an object
module.exports = {};

// Get a list of entries given a content type
module.exports.getEntries = function (contentType) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var client;
  client = getClient();
  return client.getEntries(defaults({}, options, {
    content_type: contentType
  }));
};

// Get a paginateed list of entries, supporting a different number of results
// on the first page.
module.exports.getPaginatedEntries = function (contentType, _ref) {
  var _ref$page = _ref.page,
      page = _ref$page === undefined ? 1 : _ref$page,
      _ref$perPage = _ref.perPage,
      perPage = _ref$perPage === undefined ? 12 : _ref$perPage,
      _ref$initialPerPage = _ref.initialPerPage,
      initialPerPage = _ref$initialPerPage === undefined ? null : _ref$initialPerPage;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var query;
  if (!initialPerPage) {
    // Set default initial per apge
    initialPerPage = perPage;
  }
  // Form pagination query
  query = defaults({}, options, {
    skip: page === 1 ? 0 : (page - 2) * perPage + initialPerPage,
    limit: page === 1 ? initialPerPage : perPage
  });
  // Run the query
  return module.exports.getEntries(contentType, query);
};

// Get a single item
module.exports.getEntry = function (contentType) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var client;
  client = getClient();
  return client.getEntries(defaults({}, query, {
    content_type: contentType,
    limit: 1
  })).then(function (entry) {
    var fields;
    if (!entry.items.length) {
      return;
    }
    // Merge some sys fields into the object and return just the fields
    fields = entry.items[0].fields;
    fields.id = entry.items[0].sys.id;
    fields.createdAt = entry.items[0].sys.createdAt;
    fields.updatedAt = entry.items[0].sys.updatedAt;
    fields.sys = entry.items[0].sys;
    return fields;
  });
};

// Get an entry by slug
module.exports.getEntryBySlug = function (contentType, slug) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return module.exports.getEntry(contentType, defaults({}, query, {
    'fields.slug': slug
  }));
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("lodash/defaults");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
Utility for dealing with reference fields
*/
var merge;

// Deps
merge = __webpack_require__(1);

module.exports = {};

// Take an array of references (that may be empty or undefined), filter out
// the broken references (like where only the link with no fields is returned),
// and then return just the attributes, merging in the id and dates
module.exports.refs = function (entries) {
  return (entries || []).filter(function (entry) {
    return entry != null ? entry.fields : void 0;
  }).map(function (entry) {
    return module.exports.ref(entry);
  });
};

// Merge id, dates, and sys into the fields, maintining reactivity
module.exports.ref = function (entry) {
  var fields;
  if (!(entry != null ? entry.fields : void 0)) {
    return;
  }
  fields = merge({}, entry.fields);
  fields.id = entry.sys.id;
  fields.createdAt = entry.sys.createdAt;
  fields.updatedAt = entry.sys.updatedAt;
  fields.sys = entry.sys;
  return fields;
};

/***/ })
/******/ ]);