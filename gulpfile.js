const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat'); 
const sass = require('gulp-sass');

// const changed = require('gulp-changed');
// const imagemin = require('gulp-imagemin');

/*
	--Basic Functons	
	gulp.task  	// Define Tasks
	gulp.src  	// Point Tofiles to use
	gulp.dest 	// Points to folder to output
	gulp.watch 	// Watch files and folders for Changes 
*/


// Log Msg
gulp.task('msg', ()=>{
    return console.log("Hello World");
});


// Copy Src to Dest All HTML files 
gulp.task('html', ()=>{
	gulp.src('src/**/*.html')
		 .pipe(gulp.dest('dist/'));
		 
   return console.log
    ("Html Files Copiedb successfully to dist Folder");

});


// // JavaScript Minify + concat
gulp.task('jsmin', ()=>{
	var jsSrc = 'src/js/**/*.js',
			jsDist = 'dist/js';
			
	gulp.src(jsSrc)
		.pipe(concat('scripts_bundle.min.js'))
		.pipe(uglify())
	  .pipe(gulp.dest(jsDist));
	 return console.log
	 ("Js files minified & Concat successfully to ScriptsBundle.min.js File");
	// var jsSrc = 'src/img/*.+(png|jpg|gif)';
});

// Minify JavaScript 
gulp.task('js', ()=>{
	var jsSrc = 'src/js/**/*.js',
			jsDist = 'dist/js/';
			
	gulp.src(jsSrc)
		.pipe(uglify())
	  .pipe(gulp.dest(jsDist));
	 return console.log
	 ("Js files minified successfully to dist/Js Direcotry");
});



// Sass Compile 
gulp.task('sass', ()=>{
	var sass_Src = 'src/sass/*.scss';
		 var sass_Dst = 'dist/css';

	gulp.src(sass_Src)
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest(sass_Dst));
});


gulp.task('default', gulp.parallel('html','jsmin','sass'));


// gulp.task('default',['js','sass'],function(){
// 	return console.log("Gulp Default Task");
// })



//---------------------
//--- Image Minify-----
//---------------------
// gulp.task('imagemin', ()=>{
// 	gulp.src(imgSrc)
// 	.pipe(changed(imgDst))
// 	.pipe(imagemin())
// 	.pipe(gulp.dest(imgDst));
// });