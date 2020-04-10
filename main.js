require('dotenv').config()

var express = require('express');
var Twitter = require('twitter');

var app = express();
app.listen(process.env.PORT);

const timelinePath = '/statuses/user_timeline.json';

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get('/tweets/:username', function(req, response) {
  var username = req.params.username;
  client.get(timelinePath, {screen_name: username, count: 10}, function(err, tweets, res) {
    response.send(tweets);
  });
});
