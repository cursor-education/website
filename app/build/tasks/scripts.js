// the "scripts" task
// copy scripts from src/scripts/*.* into dest file

module.exports = {
  dep: ['lint-scripts'],
  fn: (gulp, params, done) => {
    const del = require('del');
    const env = require('gulp-environment');
    const browserSync = require('browser-sync');

    // remove old scripts
    del([`${params.paths.assets}/*.js`], {force: true}, done);

    return gulp.src([
        `${params.paths.src}/scripts/common.js`,
        `${params.paths.src}/scripts/pages/*.js`
      ])

      .pipe(params.plugins.babel({
        presets: ['es2015']
      }))

      .pipe(params.plugins.uglify({
        // mangle: false,
      }))

      .pipe(env.if.not.development(params.plugins.rev()))
      .pipe(env.if.not.development(params.plugins.revFormat({
          prefix: '.v',
          lastExt: false
      })))
      .pipe(env.if.development(params.plugins.print()))

      .pipe(params.plugins.injectString.prepend(`/* Created: ${Date()} */\n`))
      .pipe(env.if.development(params.plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(params.paths.assets))
      .pipe(browserSync.stream({match: "**/*.js"}))

      .pipe(params.plugins.rev.manifest({
        base: params.paths.dest,
        path: `${params.paths.dest}/revision.json`,
        merge: true
      }))
      .pipe(gulp.dest(params.paths.dest));
  }
};
