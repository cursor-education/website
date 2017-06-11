// the "watch" task
// will rebuid the assets when something was changed

module.exports = (gulp, params, done) => {
  const env = require('gulp-environment');
  const browserSync = require('browser-sync');
  const sequence = require('gulp-sequence')

  let reload = browserSync.reload;

  // rebuild all app when build scripts has been changed
  gulp.watch(`${params.paths.src}/server/**/*`, ['server']);

  // rebuild assets when sources has been changed
  gulp.watch(`${params.paths.src}/styles/**/*.scss`, ['styles']);
  gulp.watch(`${params.paths.src}/scripts/**/*.js`, ['scripts']);
  gulp.watch(`${params.paths.src}/images/**/*.*`, ['images']);
  gulp.watch(`${params.paths.src}/views/**/*.pug`, ['views']);

  // request data again when local data has been changed
  gulp.watch(`${params.paths.src}/data/**/*.json`, sequence('data', 'views'));

  // rebuild all app when config has been changed
  gulp.watch(`${params.paths.build}/**/*.js`, ['build']);
  gulp.watch(`${params.paths.src}/config.json`, ['build']);

  gulp.watch(`${params.paths.dest}/*.html`).on('change', reload);
};
