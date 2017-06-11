// the "data-spreadsheets" task
// will collect data from external resources (like Google Spreadsheets)

module.exports = (gulp, params, done) => {
  const fs = require('fs');
  const got = require('got');
  const tsv = require('tsv');
  const Q = require('q');
  const _ = require('underscore');

  let requests = [];

  // list of name & google-document key
  let nameKeyMap = params.config['data-spreadsheets'];

  //
  for (let name in nameKeyMap) {
    let key = nameKeyMap[name];
    let url = `https://docs.google.com/spreadsheets/d/${key}/export?gid=0&format=tsv`;

    let deferred = Q.defer();

    // https://www.npmjs.com/package/got
    got(url)
      .then(response => {
        let data = tsv.parse(response.body.replace(/\r\n/g, "\n"));

        // transform object keys to lowerCase
        data = _.map(data, (line) => {
          let o = {};

          _.each(line, (value, key) => o[key.toLowerCase()] = value);

          return o;
        });

        fs.writeFileSync(`${params.paths.dest}/data/data-spreadsheet-${name}.json`, JSON.stringify(data));

        deferred.resolve();
      })
      .catch(deferred.reject);

    requests.push(deferred.promise);
  }

  // will end task when all promises will be completed
  return Q.all(requests);
};
