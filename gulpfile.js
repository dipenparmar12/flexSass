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