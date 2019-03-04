const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat'); 

/*
	--Basic Functons	
	gulp.task  	// Define Tasks
	gulp.src  	// Point Tofiles to use
	gulp.dest 	// Points to folder to output
	gulp.watch 	// Watch files and folders for Changes 
*/


// Log Msg
gulp.task('msg', function(){
    return console.log("Hello World");
});



// Copy Src to Dest All HTML files 
gulp.task('copyHTML', function(){
	gulp.src('src/**/*.html')
     .pipe(gulp.dest('dist/'));

   return console.log
    ("Html Files Copied successfully to dist Folder");

});


// Minify JavaScript
gulp.task('minjs', function(){
	gulp.src('src/js/**/*.js')
	  .pipe(uglify())
	  .pipe(gulp.dest('dist/js'));
   return console.log
    ("Js files minified successfully");

});


// Image Minify 
gulp.task('imagemin', function(){
	var imgSrc = 'src/img/*.+(png|jpg|gif)';
   	var imgDst = 'dist/img';
   
	gulp.src(imgSrc)
	.pipe(changed(imgDst))
	.pipe(imagemin())
	.pipe(gulp.dest(imgDst));
});



// Sass Compile 
gulp.task('sass', function(){
	var sass_Src = 'src/sass/*.scss';
   	var sass_Dst = 'dist/css';
   
	gulp.src(sass_Src)
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest(sass_Dst));
});


// JavaScript Minify + concat  
gulp.task('script', function(){
	gulp.src('src/js/**/*.js')
	  .pipe(concat('main.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('dist/js'));
   return console.log
    ("Js files minified successfully");

});



// gulp.task('default',['script','imagemin'],function(){
// 	return console.log("Default");
// });

// //Default Gulp-Task
gulp.task('default',['script'],function(){
   return console.log
	  ("Default Task");
});



// npm install
// npm install -g gulp 
// npm init
// mkdir src dist

// npm install --save-dev gulp
// npm install --save-dev gulp-changed
// npm install --save-dev gulp-imagemin
// npm install --save-dev gulp-uglify
// npm install --save-dev gulp-sass
// npm install --save-dev gulp-concat