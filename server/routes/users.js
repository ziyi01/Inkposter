var express = require('express');
var router = express.Router();
var db = require('../db');

/* Example endpoint that
  1) makes example call to database
  2) sends placeholder data to client
*/
router.get('/', function (req, res, next) {
  db.create().catch(console.dir);
  res.send('respond with a resource');
});

module.exports = router;
