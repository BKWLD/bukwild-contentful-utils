'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var contentful = _interopDefault(require('contentful'));
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

var bukwildContentfulUtils = createCommonjsModule(function (module) {
// Deps
var makeClient;

// Lib includes
makeClient = clientFactory;

// We will export an object
module.exports = {};

// Accept the API configuration and create the client instance
module.exports.config = function(options) {
  return module.exports.client = makeClient(options);
};

// Merge additional functions into library
module.exports.merge = function() {};
});
var bukwildContentfulUtils_1 = bukwildContentfulUtils.config;
var bukwildContentfulUtils_2 = bukwildContentfulUtils.client;
var bukwildContentfulUtils_3 = bukwildContentfulUtils.merge;

exports.default = bukwildContentfulUtils;
exports.config = bukwildContentfulUtils_1;
exports.client = bukwildContentfulUtils_2;
exports.merge = bukwildContentfulUtils_3;
