var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// var babel = require('gulp-babel');
// var rename = require('gulp-rename');
// var cleanCSS = require('gulp-clean-css');
// var del = require('del');


var paths = {
	html:{
		src:"src/**/*.html",
		dest:"dest/"
	},
	styles:{
		src:"src/sass/**/*.scss",
		dest:"dest/assets/style/"
	},
	scripts:{
		src:"src/script/**/*.js",
		dest:"dest/assets/script/"
	}
};


// function clean(){
// 	return del(['assets']);
// }



// Html minify
function html(){
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest));
}


// Sass Assets Complilation
function styles(){
	return gulp.src(paths.styles.src)
		.pipe(sass())
		// .pipe(clearCSS())		
		// .pipe(rename(){
			// basename: "main",
			// suffix:".min"
		// })
		.pipe(gulp.dest(paths.styles.dest));
}


// SCript Compilation
function scripts(){
	return gulp.src(paths.scripts.src)
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(paths.scripts.dest));
}

// Watch Both Sass & JS scripts 
function watch(){
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.html.src, html);
}


// exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

var build = gulp.series(gulp.parallel(html,styles,scripts));

gulp.task('build',build);
gulp.task('watch',build);