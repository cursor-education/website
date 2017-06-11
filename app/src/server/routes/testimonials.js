var express = require('express');
var router = express.Router();

// @url testimonials/
router.get('/', function (req, res) {
  res.render('pages/testimonials');
})

module.exports = router
