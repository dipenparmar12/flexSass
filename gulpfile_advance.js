// Install All Dependencies with one Commnad
// npm install --save-dev
  // gulp-imagemin
  // gulp-htmlmin
  // gulp-sass
  // gulp-uglify
  // gulp-concat
  // gulp-csso
  // gulp-autoprefixer
  // gulp-run-sequence
  // gulp-live-server


var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

// New plugins 
var liveServer = require('gulp-live-server');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
// var runSequence = require('run-sequence');
// var {phpMinify} = require('@cedx/gulp-php-minify');


const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


/*  
    --- main FUnctions 
    gulp.task  -- define tasks 
    gulp.src  -- point tofiles to use
    gulp.dest -- pooints to folder to output 
    gulp.watch -- watch files and folders for changes 

*/



// log Messages 
gulp.task('msg',function () {
    return console.log(' Hello wrold, we are watching every html,scss,js and images files of your project');
});


//  Image optimizer plugin 
gulp.task('minify:images',() =>
    gulp.src('src/images/*')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('dest/images'))
);


// Gulp task to minify HTML files
gulp.task('minify:html', function() {
  return gulp.src(['src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dest'));
});


// Gulp task to minify SCSS ->CSS files
gulp.task('minify:scss', function () {
  return gulp.src('src/sass/**/*.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS} ))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('dest/css'))
});


// JS Minify + plus // combine all js into one file
gulp.task('minify:js', function() {
    gulp.src('src/js/**/*')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dest/js'))
});


// Runs watch command if made change in src folder
gulp.task('watch',function () {
    gulp.watch('src/**/*.html',['minify:html']);
    gulp.watch('src/sass/**/*.scss',['minify:scss']);
    gulp.watch('src/js/**/*.js',['minify:js']);
    gulp.watch('src/images/**/*',['minify:images']);

    // gulp.watch('src/**/*',['default']); // watch all files in src folder
})


//  minify all files, js html scss->css 
gulp.task('minify:all',['minify:html','minify:scss','minify:js']);

//  Run all task in one command gulp 
// gulp.task('default',['msg','watch'] );
