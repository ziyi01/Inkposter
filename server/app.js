require('dotenv').config();

const debug = require('debug')('server:app');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var db = require('./db')
var apiRouter = require('./routes/api');
var app = express();

var logger = require('morgan'); // HTTP request logger middleware for node.js
app.use(logger('dev', { stream: { write: function(msg) { debug(msg); } }}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const buildPath = path.normalize(path.join(__dirname, '../app/build'));
app.use(express.static(buildPath));

app.use('/api', apiRouter);
app.use('*',  (req, res) => {
    res.sendFile(path.join(__dirname, '/../app/build', 'index.html'));
});

// catch 404
app.use(function(req, res, next) {
  return res.status(404).send({ error: "Not found" });
});

// setup database connection
db.connectToMongoDB();

module.exports = app;
