// the "build" task
// will run all tasks in required order to build the app

module.exports = (gulp, params, done) => {
  // https://www.npmjs.com/package/gulp-sequence
  const sequence = require('gulp-sequence')

  let tasks = [
    'clean-before',  // clean temporary files
    'lint',
    [
      'images',    // copy images
      'scripts',   // copy scripts
      'data',      // request data
    ],
    'styles',        // build styles
    'views',         // build templates
    'clean-after',   // will clean-up temporary files & directories after build
  ];

  tasks.push(done);
  sequence.apply(sequence, tasks);
};
