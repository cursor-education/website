// the "images" task
// copy images from src/images/*.* into dest file

module.exports = (gulp, params, done) => {

  return gulp
    .src(`${params.paths.src}/images/**/*`)
    .pipe(gulp.dest(params.paths.assets))

    // .src(`${params.paths.src}/images/*.*`)
    // .pipe(params.plugins.copy(params.paths.assets, {
    //   prefix: 999
    // }));

};
