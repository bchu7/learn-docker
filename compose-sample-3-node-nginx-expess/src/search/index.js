'use strict'

// install redis first:
// https://redis.io/

// then:
// $ npm install redis
// $ redis-server

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('node:path');
var redis = require('redis');

var db = redis.createClient();

// npm install redis

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

// populate search

db.sAdd('ferret', 'tobi');
db.sAdd('ferret', 'loki');
db.sAdd('ferret', 'jane');
db.sAdd('cat', 'manny');
db.sAdd('cat', 'luna');

/**
 * GET search for :query.
 */

app.get('/search/:query?', function(req, res, next){
  var query = req.params.query;
  db.sMembers(query, function(err, vals){
    if (err) return next(err);
    res.send(vals);
  });
});

/**
 * GET client javascript. Here we use sendFile()
 * because serving __dirname with the static() middleware
 * would also mean serving our server "index.js" and the "search.jade"
 * template.
 */

app.get('/client.js', function(req, res){
  res.sendFile(path.join(__dirname, 'client.js'));
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
