// the "server" task
// will run a server with livereload

module.exports = (gulp, params, done) => {
  const env = require('gulp-environment');
  const browserSync = require('browser-sync');
  const fs = require('fs');

  // http://caolan.github.io/async/
  const async = require('async');
  const exec = require('child_process').exec;
  // const nodemon = require('gulp-nodemon');

  return async.series([

    // copy config.json
    (callback) => {
      fs.writeFileSync(`${params.paths.dest}/config.json`, JSON.stringify(params.config));
      callback();

      // gulp
      //   .src(`${params.paths.src}/config.json`)
      //   .pipe(gulp.dest(params.paths.dest))
      //   .on('end', callback);
    },

    // copy server.js
    (callback) => {
      gulp
        .src(`${params.paths.src}/server/**/*`)
        .pipe(gulp.dest(`${params.paths.dest}/server`))
        .on('end', callback);
    },
    (callback) => {

      params.plugins.nodemon({
        // nodemon: params.plugins.nodemon,
        script: `${params.paths.dest}/server/server.js`,
        // ext: 'js html',
        watch: [],
        stdout: true,
        env: { 'NODE_ENV': env.current.name }
      })

      callback()

      // const cmd = `node ${params.paths.dest}/server.js`;
      // exec(cmd, (err, stdout, stderr) => {
      //   console.log(1111);
      //   console.log(stdout);
      //   console.log(stderr);
      //   callback();
      // });
      // console.log('run server/js');

    },
    (callback) => {
        return browserSync({
          open: false,
          notify: false,
          host: 'localhost',
          port: env.is.development() ? 8000 : 8000,
          ui: {
            enabled: env.is.development()
          },
          ghostMode: env.is.development(),
          logLevel: env.is.development() ? "warn" : "silent",
          logConnections: env.is.development(),
          logFileChanges: env.is.development(),
          proxy: {
            target: 'http://localhost:8080',
            ws: true
          },
          // server: {
          //   baseDir: [params.paths.dest],
          //   index: "index.html",
          //   serveStaticOptions: {
          //     extensions: ['html']
          //   }
          // }
        });
        callback()
    }
  ], (err, results) => {
    console.log('done!!!', err, results)
    done()
  });

};
