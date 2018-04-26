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

var clientFactory = once$1(function (options) {
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

var image = function image(field, width, height) {
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
  return url + '?' + queryString$1.stringify(params);
};

/*
A helper for making the Nuxt head from a contentful SEO entry
*/
var isObject$1, merge$1;

isObject$1 = isObject;

merge$1 = merge;

var seo = function seo() {
  var seo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults$$1 = arguments[1];

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

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
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
  module.exports.getEntries = function (contentType) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var client;
    client = getClient();
    return client.getEntries(defaults$$1(options, {
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
    query = defaults$$1(options, {
      skip: page === 1 ? 0 : (page - 2) * perPage + initialPerPage,
      limit: page === 1 ? initialPerPage : perPage
    });
    // Run the query
    return module.exports.getEntries(contentType, query);
  };

  // Get a single item
  module.exports.getEntry = function () {
    var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contentType) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var client, entry, fields;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              client = getClient();
              _context.next = 3;
              return client.getEntries(defaults$$1(query, {
                content_type: contentType,
                limit: 1
              }));

            case 3:
              entry = _context.sent;

              if (!entry.items.length) {
                _context.next = 10;
                break;
              }

              fields = entry.items[0].fields;
              fields.id = entry.items[0].sys.id;
              fields.createdAt = entry.items[0].sys.createdAt;
              fields.updatedAt = entry.items[0].sys.updatedAt;
              return _context.abrupt('return', fields);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Get an entry by slug
  module.exports.getEntryBySlug = function () {
    var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(contentType, slug) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return module.exports.getEntry(contentType, {
                'fields.slug': slug
              });

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }();
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

  module.exports.config = function (options) {
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
