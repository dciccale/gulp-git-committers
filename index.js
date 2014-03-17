var through = require("through2");
var gutil = require("gulp-util");
var exec = require('child_process').exec;
var os = require('os');
var _ = require('lodash');

module.exports = function (options) {
  "use strict";

  var defaults = {
    sort: 'chronological', // Alphabetical, commits
    email: false, // Show emails in the output
    nomerges: false, // Only works when sorting by commits
    output: './AUTHORS.txt' // The output file
  };

  options = defaults;


  // see "Writing a plugin"
  // https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
  function gitCommitters(file, enc, callback) {
    /*jshint validthis:true*/
    var _format = function (stdout) {
      var maxcol = 0;
      var pad = ' ';

      return stdout.replace(/^\s+|\s+$/g, '').split('\n').map(function (l) {
        var numl = l.match(/\d+/);

        if (numl) {
          numl = numl[0].length;
          maxcol = numl > maxcol ? numl : maxcol;
          pad = '  ' + new Array(maxcol - numl + 1).join(' ');
        }

        return l.replace(/\t+/, pad).trim();
      });
    };

    // Sort types
    var sortMethod = {
      alphabetical: 'sort',
      chronological: 'reverse'
    };

    // Sort output
    var _sort = function (stdout) {
      if (sortMethod[options.sort]) {
        stdout = _.unique(stdout[sortMethod[options.sort]]());
      }
      return stdout;
    };

    // Default command 'git'
    var cmd = 'git';

    if (options.sort === 'chronological' || options.sort === 'alphabetical') {
      cmd += ' log --pretty="%aN';

      // Show email
      if (options.email) {
        cmd += ' <%aE>';
      }

      cmd += '"';

    // Sort by number of commits
    } else if (options.sort === 'commits') {
      cmd += ' shortlog -ns';

      // Show email
      if (options.email) {
        cmd += 'e';
      }

      // Omit merge commits
      if (options.nomerges) {
        cmd += ' --no-merges';
      }

      // Detect current system use the appropriate terminal
      if (/win32/.test(process.platform)) {
        cmd += ' < CON';
      } else {
        cmd += ' < /dev/tty';
      }
    }

    exec(cmd, function (error, stdout, stderr) {
      if (!error) {
        stdout = _format(stdout);
        stdout = _sort(stdout);
        grunt.file.write(options.output, stdout.join(os.EOL));
        gutil.log('File "' + options.output + '" created.');
        done();
      } else {
        gutil.log(error);
      }
    });
  }

  return through.obj(gitCommitters);
};
