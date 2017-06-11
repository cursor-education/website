// the "default" task
// will run build & serve the app

module.exports = (gulp, params, done) => {
  // https://www.npmjs.com/package/gulp-sequence
  const sequence = require('gulp-sequence')

  let tasks = [
    'build',   // rebuild app
    [
      'server',  // and start server
      'watch'    // to do reload when something has been changes
    ]
  ];

  tasks.push(done);
  sequence.apply(sequence, tasks);
};
