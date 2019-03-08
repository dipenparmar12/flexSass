// const { series, parallel } = require('gulp');

// function clean(cb) {
//   // body omitted
//   cb();
// }

// function cssTranspile(cb) {
//   // body omitted
//   cb();
// }

// function cssMinify(cb) {
//   // body omitted
//   cb();
// }

// function jsTranspile(cb) {
//   // body omitted
//   cb();
// }

// function jsBundle(cb) {
//   // body omitted
//   cb();
// }

// function jsMinify(cb) {
//   // body omitted
//   cb();
// }

// function publish(cb) {
//   // body omitted
//   cb();
// }

// function build(cb) {
//   // body omitted
//   cb();
// }

// const { watch } = require('gulp');
// const watcher = watch(['src/**/*.html']);

// watcher.on('change', function(path, stats) {
//   console.log(`File ${path} was changed`);
// });

// watcher.on('add', function(path, stats) {
//   console.log(`File ${path} was added`);
// });

// watcher.on('unlink', function(path, stats) {
//   console.log(`File ${path} was removed`);
// });

// watcher.close();

// exports.build = series(clean, parallel( cssTranspile, series(jsTranspile, jsBundle) ),
// 							  parallel( cssMinify, jsMinify), publish
// );

// exports.default = series(clean, build);




//  npm install --save-dev gulp -g
//  npm install --save-dev gulp-sass


// gulpfile.js

var gulp = require("gulp");
var sass = require("gulp-sass");
var paths = {
	html:{src:"src/**/*.html", dest:"dest/" },
	styles:{ src:"src/sass/**/*.scss", dest:"dest/assets/style/" },
	scripts:{ src:"src/script/**/*.js", dest:"dest/assets/script/" }
};



// Define tasks after requiring dependencies
function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src(paths.styles.src)
 
            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)
 
            // What is the destination for the compiled file?
            .pipe(gulp.dest(paths.styles.dest))
    );
}
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;
// CLI Command
// gulp style

// to Set Watch()
function watch(){
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, style)
}
   
// Don't forget to expose the task!
exports.watch = watch