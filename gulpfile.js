const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const sass = require('gulp-sass')(require('sass'));

// https://www.npmjs.com/package//gulp-sass

gulp.task('compress', function () {
	gulp.src(['lib/*.js', 'lib/*.mjs']).pipe(minify()).pipe(gulp.dest('dist'));
});

gulp.task('minify-css', () => {
	return gulp
		.src('./src/styles/*.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('render-css', () => {
	return gulp.src('./src/styles/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./css'));
});

// exports.buildStyles = buildStyles;
// exports.watch = function () {
// 	gulp.watch('./sass/**/*.scss', ['sass']);
// };

gulp.task('watch', () => {
	gulp.watch('./src/styles/*.scss', gulp.series('render-css'));
});
