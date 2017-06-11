var express = require('express');
var router = express.Router();

// @url /course/:courseId
router.get('/:courseId', function (req, res) {
  let courseId = req.params['courseId'];
  res.render('pages/course');
})

module.exports = router
