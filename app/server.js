var express = require('express');

var app = express();

app.get('/', function(req, res){
    res.send('Hello from inside a container 0.1');
});

app.listen(8080);
console.log('Running on http://localhost');