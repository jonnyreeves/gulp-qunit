var path = require('path');
var childProcess = require('child_process');
var gutil = require('gulp-util');
var through = require('through2');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

module.exports = function(){
    return through.obj(function (file, enc, cb) {
        var childArgs = [
            path.join(__dirname, 'runner.js'),
            file.path
        ];

        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
            console.log(stdout);

            if (stderr !== '') {
                console.log(stderr);
            }

            if (err !== null) {
                console.log(err);
            }
        });

        this.push(file);

        cb();
    });
};