var express = require('express');
var logfmt = require('logfmt');
var app = express();

app.use('/', express.static('static'))
app.use(logfmt.requestLogger());

app.get('/ping', function(req, res) {
  res.json({ alive: true });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on ' + port);
});