'use strict';

var assert = require('assert');
var resolve = require('path').resolve;
var seekout = require('./index');

var cases = [
  {
    file: 'package.json',
    expected: resolve('./package.json'),
    name: 'should return file from the local directory',
  },
  {
    file: 'package.json',
    expected: resolve('./fixture/package.json'),
    wd: resolve('./fixture/we/need/to/go/deeper'),
    name: 'should return file from provided directory',
  },
  {
    file: 'package.json',
    expected: resolve('./fixture/package.json'),
    wd: './fixture/we/need/to/go/deeper',
    name: 'should resolve relative paths',
  },
  {
    file: 'depth.json',
    expected: resolve('./fixture/we/need/to/go/deeper/depth.json'),
    wd: resolve('./fixture/we/need/to/go/deeper'),
    name: 'should return file from the nested directory',
  },
  {
    file: 'unknown',
    expected: null,
    name: 'should return null if file was not found',
  },
];

suite('seekout', function () {
  cases.forEach(function (testCase) {
    test(testCase.name, function () {
      assert.equal(seekout(testCase.file, testCase.wd), testCase.expected);
    });
  });
});
