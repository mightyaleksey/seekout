'use strict';

var fs = require('fs');
var path = require('path');

/**
 * @param {string}   file
 * @param {string}   parent
 * @param {function} callback
 */
function lookupFileSystem(file, parent, callback) {
  if (typeof parent === 'function') {
    callback = parent;
    parent = module.parent ? path.dirname(module.parent.filename) : process.cwd();
  }

  lookup(file, parent, callback);
}

/**
 * @param {string}   file
 * @param {string}   parent
 * @param {function} cb
 */
function lookup(file, parent, cb) {
  var filepath = path.join(parent, file);

  fs.stat(filepath, function (er, stats) {
    if (er && er.code !== 'ENOENT') {
      return void cb(er);
    }

    if (!er && stats.isFile()) {
      return void cb(null, filepath);
    }

    if (path.parse(parent).root !== parent) {
      return void lookup(file, path.dirname(parent), cb);
    }

    cb(null, null);
  });
}

module.exports = lookupFileSystem;
