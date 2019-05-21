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


var assets, makeClient, merge, queries, references;

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

// Add assets helpers
assets = __webpack_require__(5);

module.exports.img = assets.img;

module.exports.image = module.exports.img; // Backwards compatibilty

module.exports.aspect = assets.aspect;

module.exports.url = assets.url;

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

module.exports = {};

// Apply crop rules to an image
module.exports.img = function (field, width, height) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var params, url;
  // Make sure that a valid field was passed
  if (!(url = module.exports.url(field))) {
    return;
  }
  // Create query params
  params = {};
  params.w = width;
  params.h = height;
  if (options.format) {
    params.fm = options.format;
  }
  params.q = options.quality || (params.fm === 'jpg' ? 90 : void 0);
  if (params.fm === 'jpg') {
    params.fl = 'progressive';
  }
  if (options.fit) {
    params.fit = options.fit;
  }
  // Make the URL
  return url + '?' + queryString.stringify(params);
};

// Return the aspect ratio of an image
module.exports.aspect = function (field) {
  var height, image, ref, ref1, ref2, width;

  // Make sure that a valid field was passed
  if (!(image = field != null ? (ref = field.fields) != null ? (ref1 = ref.file) != null ? (ref2 = ref1.details) != null ? ref2.image : void 0 : void 0 : void 0 : void 0)) {
    return;
  }

  // Make the aspect ratio
  var _image = image;
  width = _image.width;
  height = _image.height;

  return width / height;
};

// Get the file url for a reference, which may not exist
module.exports.url = function (field) {
  var ref, ref1;
  return field != null ? (ref = field.fields) != null ? (ref1 = ref.file) != null ? ref1.url : void 0 : void 0 : void 0;
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
var defaults, getClient, getEntries, getEntry, ref, refs;

// Deps
defaults = __webpack_require__(10);

getClient = __webpack_require__(2);

// Gonna export an object
var _require = __webpack_require__(11);

refs = _require.refs;
ref = _require.ref;
module.exports = {};

// Get a list of entries given a content type
module.exports.getEntries = getEntries = function getEntries(contentType) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var client;
  client = getClient();
  return client.getEntries(defaults({}, options, {
    content_type: contentType
  })).then(function (response) {
    response.items = refs(response.items);
    return response;
  });
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
  return getEntries(contentType, query);
};

// Get a single item
module.exports.getEntry = getEntry = function getEntry(contentType) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var client;
  client = getClient();
  return client.getEntries(defaults({}, query, {
    content_type: contentType,
    limit: 1
  })).then(function (response) {
    if (!response.items.length) {
      return;
    }
    return ref(response.items[0]);
  });
};

// Get an entry by slug
module.exports.getEntryBySlug = function (contentType, slug) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return getEntry(contentType, defaults({}, query, {
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
var merge, _ref;

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
    return _ref(entry);
  });
};

// Merge id, dates, and sys into the fields, maintaining reactivity
module.exports.ref = _ref = function ref(entry) {
  var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


  // Require fields
  if (!(entry != null ? entry.fields : void 0)) {
    return;
  }

  // Prevent infinite loops since Contentful JSON can be recursive
  if (parents.includes(entry.sys.id)) {
    return;
  }

  // Recurse through the object and apply ref to child references
  return Object.keys(entry.fields).reduce(function (output, key) {
    var ref1, value;
    value = entry.fields[key];

    // If the value is an array, apply ref to any items that look like entries
    if (Array.isArray(value)) {
      value = value.map(function (item) {
        var ref1;
        if ((item != null ? (ref1 = item.sys) != null ? ref1.type : void 0 : void 0) === 'Entry') {
          return _ref(item, parents.concat([entry.sys.id]));
        } else {
          return item;
        }
      });

      // If the value looks like an entry, get the ref of it
    } else if ((value != null ? (ref1 = value.sys) != null ? ref1.type : void 0 : void 0) === 'Entry') {
      value = _ref(value, parents.concat([entry.sys.id]));
    }

    // Merge the value into the output object
    output[key] = value;
    return output;
  }, {

    // Merge into an object containing the most commonly used aspects of sys
    id: entry.sys.id,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    sys: entry.sys
  });
};

/***/ })
/******/ ]);