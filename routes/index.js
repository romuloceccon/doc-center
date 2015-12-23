var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/*', function(req, res, next) {
  var f = path.normalize(__dirname + '/../files' + req.path);
  res.sendFile(f);
});

module.exports = router;
