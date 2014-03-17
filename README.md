(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

# gulp-git-committers
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> git-committers plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-git-committers` as a development dependency:

```shell
npm install --save-dev gulp-git-committers
```

Then, add it to your `gulpfile.js`:

```javascript
var git-committers = require("gulp-git-committers");

gulp.src("./src/*.ext")
	.pipe(git-committers({
		msg: "Hello Gulp!"
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### git-committers(options)

#### options.msg
Type: `String`  
Default: `Hello World`

The message you wish to attach to file.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-git-committers
[npm-image]: https://badge.fury.io/js/gulp-git-committers.png

[travis-url]: http://travis-ci.org/dciccale/gulp-git-committers
[travis-image]: https://secure.travis-ci.org/dciccale/gulp-git-committers.png?branch=master

[coveralls-url]: https://coveralls.io/r/dciccale/gulp-git-committers
[coveralls-image]: https://coveralls.io/repos/dciccale/gulp-git-committers/badge.png

[depstat-url]: https://david-dm.org/dciccale/gulp-git-committers
[depstat-image]: https://david-dm.org/dciccale/gulp-git-committers.png
