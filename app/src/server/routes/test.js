var express = require('express');
var router = express.Router();

// @url /test/trello
router.get('/trello', function (req, res) {
  let trello = require('../helpers/trello');

  trello.addCard('aaa', 'bbb');

  res.send('testing trello');
})

// @url /test/sms
router.get('/sms', function (req, res) {
  let sms = require('../helpers/sms');

  sms.send('aaa', 'bbb');

  res.send('testing sms');
})

// @url /test/page
router.get('/page', function (req, res) {
  res.render('pages/test');
})

module.exports = router
