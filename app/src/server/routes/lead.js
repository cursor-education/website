var express = require('express');
var router = express.Router();
let trello = require('../helpers/trello');
var fs = require('fs');

// @url /lead
router.post('/new', function (req, res) {
  var name = req.body.name;
  var phone = req.body.phone;
  var email = req.body.email;

  trello.addCard(name, 'phone: ' + phone + "\n" + 'email:' + email);

  let line = (new Date().toJSON()) + "\t" + name + "\t" + phone + "\t" + email + "\n";
  fs.appendFile("/tmp/leads.txt", line);

  res.json({"success": "ok"})
})

//
router.get('/get/all/list', (req, res) => {
  fs.readFile("/tmp/leads.txt", 'utf8', (err, data) => {
    res.send(data);
  });
})

module.exports = router
