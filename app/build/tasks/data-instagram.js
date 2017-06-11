// the "data-instagram" task
// will collect images from instagram
import Instagram from 'node-instagram';

module.exports = (gulp, params, done) => {
  if (params.config.instagram.enabled === false) {
    return done();
  }

  const Q = require('q');
  const fs = require('fs');
  const _ = require('underscore');
  const print = require('gulp-print');

  // https://github.com/pradel/node-instagram
  const instagram = new Instagram({
    clientId: params.config.instagram.client_id,
    accessToken: params.config.instagram.access_token,
  });

  // request all media
  let requestMedia = () => {
    let deferred = Q.defer();

    let media = {};
    let previousMedia = null;

    // recursively request page-by-page
    let request = (cb) => {
      requestMediaFromNextPage(previousMedia).then((currentMedia) => {
        previousMedia = currentMedia;

        // store only unique medias (by id)
        media = _.union(media, currentMedia);
        // media = _.uniq(media, false, (item) => item.id);

        // if we reach the max limit - stop & exit
        if (media.length >= params.config.instagram.max_limit) {
          return cb();
        }

        request(cb);
      });
    };

    // when we'll get the max-limit photos
    request(() => {
      // save photos to tmp/.json file
      fs.writeFileSync(`${params.paths.dest}/data/data-instagram-photos.json`, JSON.stringify(media));

      deferred.resolve();
    });

    // will end task when promise will be completed
    return deferred.promise;
  };

  // request media from current page
  let requestMediaFromNextPage = (previousPageData) => {
    let deferred = Q.defer();

    let params = {};

    // add "start-from-id" if data from previous page was passed
    if (previousPageData) {
      params = {
        MAX_ID: _.last(previousPageData).id
      }
    }

    instagram.get('users/self/media/recent', params, (err, response) => {
      let images = _.map(response.data, (item) => {
        return {
          id: item.id,
          caption: item.caption && item.caption.text ? item.caption.text : null,
          image: item.images.standard_resolution,
          fake: {
            width: _.random(50,250)
          }
        };
      });

      deferred.resolve(images);
    });

    return deferred.promise;
  };

  return requestMedia();
};
