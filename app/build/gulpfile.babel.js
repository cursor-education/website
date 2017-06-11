'use strict';

const gulp = require('gulp');
const mkdirp = require('mkdirp');
const gulpLoadPlugins = require('gulp-load-plugins');

let plugins = gulpLoadPlugins();

const paths = {
  tmp: process.cwd() + '/../build/tmp',
  src: process.cwd() + '/../src',
  dest: process.cwd() + '/../dest',
  assets: process.cwd() + '/../dest/assets',
  build: process.cwd() + '/../build',
  root: process.cwd() + '/..',
};

mkdirp(paths.tmp);

// parse & transform app's config.json from src/ directory
let config = (() => {
  const env = require('gulp-environment');
  const fs = require('fs');
  const _ = require('underscore');

  // read the plain config
  let config = JSON.parse(fs.readFileSync(`${paths.src}/config.json`, 'utf8'));

  // prepare the environment-key
  let configEnvKey = '@' + env.current.name;
  // @development, @qa, @production

  _.each(config, (value, key) => {
    // {key: {value1}} => value1
    // {key: {@development: value2, @production: value3}} => value3
    // {key: {@qa: value3}} => value3
    config[key] = typeof config[key][configEnvKey] !== 'undefined'
      ? config[key][configEnvKey]
      : (typeof config[key]['production'] !== 'undefined'
         ? config[key]['production']
         : config[key]
        );
  });

  return config;
})();

// https://github.com/betsol/gulp-require-tasks
plugins.requireTasks({
  path: process.cwd() + '/tasks',
  arguments: [{
    paths: paths,
    config: config,
    plugins: plugins
  }]
});
