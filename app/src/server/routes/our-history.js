var express = require('express');
var router = express.Router();

// @url /our-history
router.get('/', function (req, res) {
  res.render('pages/our-history');
})

module.exports = router
