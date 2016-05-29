require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.PORT || 8080;
var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/image-abstracter';

mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.error('connection error:', err);
  } else {
    console.log('successfully connected to db');
  }
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
app.use(require('./controllers'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});