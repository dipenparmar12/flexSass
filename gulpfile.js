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

// exports.build = series(clean, parallel( cssTranspile, series(jsTranspile, jsBundle) ),
// 							  parallel( cssMinify, jsMinify), publish
// );

// exports.default = series(clean, build);




//  npm install --save-dev gulp -g
//  npm install --save-dev gulp-sass
//  npm install --save-dev gulp-postcss autoprefixer cssnano gulp-sourcemaps
//  npm install --save-dev browser-sync
// 	npm install --save-dev gulp-htmlmin
//  ---OR---
// 	All on one File
// 	npm i --save-dev gulp gulp-sass gulp-postcss autoprefixer cssnano gulp-sourcemaps browser-sync gulp-htmlmin

// gulpfile.js
var gulp = require("gulp"),
	htmlmin = require('gulp-htmlmin'),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    cssnano = require("cssnano"),
    autoprefixer = require("autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    //for_JavaScript
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var browserSync = require("browser-sync").create();

var src="src/", dest="dest/";

var paths = {
	html:{src: src+"**/*.html", dest:dest },
	styles:{ src: src+"sass/**/*.scss", dest:dest+"assets/style/" },
	scripts:{ src: src+"script/**/*.js", dest:dest+"assets/script/" }
};

// Html minify
function html(){
	return gulp.src(paths.html.src)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(paths.html.dest));
}
exports.html = html;


// Define tasks after requiring dependencies
function style() {
    return (
        gulp
            .src(paths.styles.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // Now add/write the sourcemaps
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
    );
}
// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;
// Cmd Command
// gulp style



function script() {
  return gulp.src(paths.scripts.src)
	.pipe(uglify())
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest(paths.scripts.dest))
	.pipe(browserSync.stream())
}
var js = gulp.series(script);
exports.js = js;



// A simple task to reload the page
function reload() {
    browserSync.reload();
}


// Add browsersync initialization at the start of the watch task
function watch() {
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "./"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });

    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(src+"**/*",gulp.series(style,html,script));

    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch(src+"**/*",reload);
}
// Don't forget to expose the task!
exports.watch = watch;
   
