// the "lint-scripts" task
// will check scripts for syntax based on eslint configuration

module.exports = {
  dep: [],
  fn: (gulp, params, done) => {
    return done();
    const env = require('gulp-environment');

    return gulp.src([
        `${params.paths.src}/scripts/**/*.js`
      ])

      .pipe(params.plugins.eslint({
        configFile: `${params.paths.dest}/../.eslintrc`
      }))

      .pipe(params.plugins.eslint.format())
      .pipe(env.if.not.development(params.plugins.eslint.failAfterError()))
  }
};
