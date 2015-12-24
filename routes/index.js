var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email'] }),
  function(req, res) {});

router.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {});

router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  var u = req.user;

  var user = u.displayName;

  var email = '';
  if (u.emails && u.emails.length > 0) {
    email = u.emails[0].value;
  }

  var photo = null;
  if (u.photos && u.photos.length > 0) {
    photo = u.photos[0].value;
  }

  res.render('index', { title: 'Express', user: user, email: email, photo: photo });
});

router.get('/*', ensureAuthenticated, function(req, res, next) {
  var f = path.normalize(__dirname + '/../files' + req.path);
  res.sendFile(f);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
