// the "clean-before" task
// will clean-up the destination directory

module.exports = (gulp, params, done) => {
  // https://www.npmjs.com/package/del
  const del = require('del');

  // need {force} option for remove files outside the current working directory.
  let paths = [
    `${params.paths.dest}/*`,    // all dest/ files
    `${params.paths.tmp}/**/*`,  // the build/tmp/* files
  ];

  return del(paths, {force: true}, done);
};
