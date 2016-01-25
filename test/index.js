'use strict';

var assert = require('assert');
var lookupFileSystem = require('..');
var path = require('path');

var cases = [
  {
    file: 'example.md',
    expected: path.join(__dirname, 'example.md'),
    name: 'should return path to example.md in the local directory',
  },
  {
    file: 'readme.md',
    expected: path.join(path.dirname(__dirname), 'readme.md'),
    name: 'should return path to example.md in the parent directory',
  },
  {
    file: 'i.do.not.exist',
    expected: null,
    name: 'should return null if file was not found',
  },
];

suite('lookupFileSystem', () => {
  cases.forEach(function (testCase) {
    test(testCase.name, done => {
      lookupFileSystem(testCase.file, function (er, filepath) {
        if (er) {
          return void done(er);
        }

        assert.equal(filepath, testCase.expected);
        done();
      });
    });
  });
});
