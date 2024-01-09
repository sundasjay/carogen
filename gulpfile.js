const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const browserSync = require('browser-sync').create();

// Move image files
gulp.task('images', () => {
  return gulp.src('src/images/**/*').pipe(gulp.dest('dist/images'));
});

// Move JS files
gulp.task('js', () => {
  return gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'));
});


// Move the swiper-bundle.css file to the dist/js folder
gulp.task('move-swiper-css', () => {
  return gulp
    .src('./node_modules/swiper/swiper-bundle.min.css')
    .pipe(gulp.dest('dist/css/lib'));
});


// Compile SCSS to CSS with Tailwind CSS
gulp.task('css', () => {
  return gulp
    .src('src/scss/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([tailwindcss, autoprefixer()]))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream()); // Reload the browser when changes are made to SCSS files
});

// Update CSS file reference in HTML
gulp.task('html', () => {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Watch for changes and update the browser
gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  gulp.watch('src/**/*.scss', gulp.series('css'));
  
  gulp.watch('src/**/*.js', gulp.series('js'));
  gulp.watch('src/**/*.html', gulp.series('html')).on('change', browserSync.reload);
});

// Build task: Run the 'css' task and then 'html', 'images', and 'js'
gulp.task('build', gulp.series('css', 'html', 'images', 'js'));

// Default task: Run the 'build' task and then watch for changes
gulp.task('default', gulp.series('build', 'watch'));
