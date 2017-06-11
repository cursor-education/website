const fs = require('fs');
const glob = require('glob');
const _ = require('underscore');
let path = require('path');

let getRevisionsMapping = () => {
  let dest = __dirname + '/../../assets';
  let revisionFile = `${dest}/../revision.json`;

  if (!fs.existsSync(revisionFile)) {
    let files = glob.sync(`${dest}/*.{js,css}`)
      .map((filename) => {
        let key = path.basename(filename);
        return key;
      })
      .reduce((total,current) => {
        total[current] = current;
        return total;
      }, {});

    return files;
  }

  return JSON.parse(fs.readFileSync(revisionFile, 'utf8'));
}

let getConfig = () => {
  // read the plain config
  let config = JSON.parse(fs.readFileSync(__dirname + `/../../config.json`, 'utf8'));

  return config;
}

let getDataContent = () => {
  let dataDir = __dirname + '/../../data';
  let data = {};

  glob.sync(`${dataDir}/*.json`)
      .forEach((filename) => {
        let values = JSON.parse(fs.readFileSync(filename, 'utf8'));
        let key = path.basename(filename, '.json').replace(/^data\-/, '');

        data[key] = values;
      });

  return data;
}

module.exports = { getRevisionsMapping, getConfig, getDataContent }
