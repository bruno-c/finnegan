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
  var nums = req.query.number,
      response;

  if (!Array.isArray(nums)) nums = [nums];

  response = nums.map(function(_num) {
    var num = parseInt(_num, 10);

    if ((_num.match(/^[0-9]+$/) === null) || Number.isNaN(num)) {
      return {
        number: _num,
        error: 'not a number'
      };
    }
    else if (num > 1000000) {
      return {
        number: _num,
        error: 'too big number (>1e6)'
      };
    }
    else {
      return {
        number: _num,
        decomposition: require('./primes')(num)
      };
    }
  });

  return response.length === 1 ? res.json(response[0])
                               : res.json(response);
});

app.get('/primeFactors/ui', function(req, res) {
  res.sendfile('./static/decomposition.html');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});