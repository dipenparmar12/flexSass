const gulp = require('gulp');

/*
	--Basic Functons
	
	gulp.task  	// Define Tasks
	gulp.src  	// Point Tofiles to use
	gulp.dest 	// Points to folder to output
	gulp.watch 	// Watch files and folders for Changes 

*/


// Log Msg
gulp.task('msg', function() {
    return console.log("Hello World");
});

// Default Gulp-Task
gulp.task('default', function() {
   gulp.src('src/**/*.html')
     .pipe(gulp.dest('dist/'));

   return console.log
   ("Html Files Copiedb successfully to Dist Folder");
   
});