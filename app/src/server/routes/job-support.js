var express = require('express');
var router = express.Router();

// @url /job-support
router.get('/', function (req, res) {
  res.render('pages/job-support');
})

module.exports = router
