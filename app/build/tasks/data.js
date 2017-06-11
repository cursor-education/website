// the "data" task
// will collect data from external resources (like Google Spreadsheets)

module.exports = (gulp, params, done) => {
  // https://www.npmjs.com/package/gulp-sequence
  const sequence = require('gulp-sequence')
  const mkdirp = require('mkdirp');

  let tasks = [
    'data-instagram',    // request images from instagram
    'data-spreadsheets', // request data before build templates
    'data-local',        // copy local data files
  ];

  mkdirp(`${params.paths.dest}/data`, (err) => {
    if (err) console.error(err);

    tasks.push(done);
    sequence.apply(sequence, tasks);
  });
};
