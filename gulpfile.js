var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var del = require('del');

// clean dist directory
gulp.task('clear-dist', function() {
	del(['dist/**']);
});

// copy all files to build directory
gulp.task('copy-all', function() {
	gulp.src(['src/**', '!src/include/js/*.js', '!src/include/css/*.scss'], {dot: true})
		.pipe(gulp.dest('dist'));
});

// minify javascript files
gulp.task('minify-js', function() {
	gulp.src(['src/include/js/*.js'], {base: 'src'})
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// lint certain javascript files (non-libraries)
gulp.task('lint-js', function() {
	gulp.src(['src/include/js/main.js'])
		.pipe(jshint({curly: true, jquery: true}))
		.pipe(jshint.reporter('default'));
});

// minify css files
gulp.task('minify-css', function() {
	gulp.src(['src/include/css/*.scss'], {base: 'src'})
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('dist'));
});

// default sets up entire project
gulp.task('default', ['copy-all', 'minify-js', 'lint-js', 'minify-css']);