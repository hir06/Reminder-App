var gulp   = require('gulp');
var browserSync = require('browser-sync').create();
gulp.task('watch', function() {
  gulp.watch('source/ng-app/components/*.js', ['jshint'].browser-sync.reload({
      stream: true
   }));
});
gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: 'source'
      },
   })
})
gulp.task('default',['browserSync','watch'], function() {
   
});
