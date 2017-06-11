// the "deploy" task
// will deploy files from destination directory to GitHub Pages

module.exports = {
  dep: [
    'build' // build app from scratch before deploy
  ],
  fn: (gulp, params, done) => {
    const env = require('gulp-environment');

    if (env.is.qa()) {
      return gulp
        .src([
          `${params.paths.dest}/**/*`,
          `${params.paths.src}/README.md`
        ])
        .pipe(params.plugins.ghPages({
          message: '(deploy) ' + (new Date().toISOString())
        }));
    }
    else {
      var options = {
        user: 'ralabssoftware',
        password: 'i17nam17lsja',
        port: 21,
        host: 'ralabs.co',
        uploadPath: '/domains/ralabs.co/public_html'
      };

      return gulp
        .src([
          `${params.paths.dest}/**/*`,
        ])
        .pipe(params.plugins.deployFtp(options))
        .pipe(gulp.dest('destx'));
    }
  }
};
