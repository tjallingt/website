var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");
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
	return gulp.src(['src/**', '!src/include/js/*.js', '!src/include/css/*.scss'], {dot: true})
		.pipe(gulp.dest('dist'));
});

// minify javascript files
gulp.task('minify-js', ['lint-js'], function() {
	return gulp.src(['src/include/js/*.js'], {base: 'src'})
		.pipe(sourcemaps.init())
			.pipe(babel({loose: "all"}))
			.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});

gulp.task('polyfill-js', function() {
	return gulp.src(['node_modules/gulp-babel/node_modules/babel-core/browser-polyfill.min.js'])
		.pipe(gulp.dest('dist/include/js/'));
});

// lint certain javascript files (non-libraries)
gulp.task('lint-js', function() {
	return gulp.src(['src/include/js/*.js'])
		.pipe(jshint({curly: true, esnext: true, jquery: true}))
		.pipe(jshint.reporter('default'))
		.pipe(jshint.reporter('fail'));
});

// minify css files
gulp.task('minify-css', function() {
	return gulp.src(['src/include/css/*.scss'], {base: 'src'})
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('dist'));
});

// default sets up entire project
gulp.task('default', ['copy-all', 'minify-js', 'polyfill-js', 'minify-css']);