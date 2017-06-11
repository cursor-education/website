// the "clean-after" task
// will clean-up the temporary directories after build

module.exports = (gulp, params, done) => {
  // https://www.npmjs.com/package/del
  const del = require('del');
  const env = require('gulp-environment');

  // need {force} option for remove files outside the current working directory.
  let paths = [];

  if (env.if.not.development()) {
    paths.push(`${params.paths.tmp}/`);  // the build/tmp directory
    paths.push(`${params.paths.assets}/**/*.psb`);
    paths.push(`${params.paths.assets}/**/*.psd`);
    paths.push(`${params.paths.assets}/**/*.eps`);
    paths.push(`${params.paths.assets}/students/src/`);
  }

  return del(paths, {force: true}, done);
};
