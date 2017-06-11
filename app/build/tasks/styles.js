// the "styles" task
// will convert & optimize sass styles

module.exports = {
  dep: [],
  fn: (gulp, params, done) => {
    const del         = require('del');
    const env         = require('gulp-environment');
    const browserSync = require('browser-sync');

    // remove old styles
    del([`${params.paths.assets}/*.css`], {force: true}, done);

    return gulp.src([
        `${params.paths.src}/styles/common.scss`,
        `${params.paths.src}/styles/pages/*.scss`
      ])
      .pipe(params.plugins.plumber())
      .pipe(env.if.development(params.plugins.sourcemaps.init()))

      .pipe(params.plugins.sass.sync({
        outputStyle: env.is.development() ? 'expanded' : 'compressed'
      }).on('error', params.plugins.sass.logError))

      .pipe(params.plugins.autoprefixer({
        browsers: [
          '> 1%',
          'last 2 versions'
        ],
        cascade: false
      }))

      .pipe(env.if.not.development(params.plugins.csso({
        restructure: false
      })))

      .pipe(env.if.not.development(params.plugins.rev()))
      .pipe(env.if.not.development(params.plugins.revFormat({
          prefix: '.v',
          lastExt: false
      })))
      .pipe(env.if.development(params.plugins.print()))

      .pipe(params.plugins.injectString.prepend(`/* Created: ${Date()} */\n`))
      .pipe(env.if.development(params.plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(params.paths.assets))
      .pipe(browserSync.stream({match: "**/*.css"}))

      .pipe(params.plugins.rev.manifest({
        base: params.paths.dest,
        path: `${params.paths.dest}/revision.json`,
        merge: true
      }))
      .pipe(gulp.dest(params.paths.dest));
  }
};
