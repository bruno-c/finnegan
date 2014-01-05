'use strict';

var express = require('express');
var logfmt = require('logfmt');
var app = express();

app.use('/', express.static('static'));
app.use(logfmt.requestLogger());

app.get('/ping', function(req, res) {
  res.json({ alive: true });
});

app.get('/primeFactors', function(req, res) {
  var num = parseInt(req.query.number, 10);

  if (Number.isNaN(num)) {
    return res.json({
      number: req.query.number,
      error: 'not a number'
    });
  }
  else {
    res.json({
      number: num,
      decomposition: require('./primes')(num)
    });
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});