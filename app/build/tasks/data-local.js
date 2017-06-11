// the "data-local" task
// copy local data files from src/data/*.* into dest file

module.exports = (gulp, params, done) => {

  return gulp
    .src(`${params.paths.src}/data/**/*.json`)
    .pipe(gulp.dest(`${params.paths.dest}/data`));

};
