var express = require('express');
var router = express.Router();

// @url /true-about-it
router.get('/', function (req, res) {
  res.render('pages/true-about-it');
})

module.exports = router
