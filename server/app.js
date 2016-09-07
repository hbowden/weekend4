var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var items = require('./routes/items');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/items', items);

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Listening on PORT ', app.get('port'));
});
