var gulp   = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: 'source'
      },
   })
})
gulp.task('default',['browserSync'], function() {
   
});
