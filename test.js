'use strict';

const assert = require('assert');
const resolve = require('path').resolve;
const seekout = require('.');

const cases = [
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

suite('seekout', () => {
  cases.forEach(testCase => {
    test(testCase.name, () => {
      assert.equal(seekout(testCase.file, testCase.wd), testCase.expected);
    });
  });
});
