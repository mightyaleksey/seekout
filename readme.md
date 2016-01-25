lookup-fs
=========

Looks for a provided file in the current directory. Also checks all parent directories and returns the first found file path.

## Installation

```bash
$ npm install lookup-fs
```

## Usage

```javascript
var lookupFileSystem = require('lookup-fs');

lookupFileSystem('.npmrc', function (err, filepath) {
  if (err) {
    throw err;
  }

  console.log(filepath); // /Users/sullenor/.npmrc
                         // or null if file was not found
});
```
