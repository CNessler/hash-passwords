var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/password');
var passwords = db.get('password');
var bcrypt = require('bcryptjs');
var validator = require('../lib/javascripts/server.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function (req, res, next) {
  res.render('login');
})

router.param('login', function (req, res, next) {
  passwords.findOne({email: req.body.email}, function (err, data) {
    // check if a record was found
    if (bcrypt.compareSync(req.body.pass, data.password)){
       next('route');
     }
    else {
      next();
    }
  })
}),
    function (req, res, next) {
      res.render('login', {error: 'invalid password'})
  };
// router.get('/signup', function (req, res, next) {
//   res.render('signup');
// })
router.get('/yay', function (req, res, next) {
  res.render('yay');
})


router.post('/index', function (req, res, next) {
  var errorCheck = validator(req.body.email, req.body.pass, req.body.confirm)
  console.log(errorCheck);
  if (errorCheck.length > 0){
    res.render('index', {errors: errorCheck});
  } else {
    var crypted = bcrypt.hashSync(req.body.pass, 8);
    passwords.insert({email: req.body.email, password: crypted})
    res.redirect('/')
  }
})

//
//
// router.post('/login', function (req, res, next) {
//
//   res.redirect('/login');
// })
            // if (data === null){
            //   res.render('login', {error: 'fix email'})
            // } else {
            //     if (bcrypt.compareSync(req.body.pass, data.password)){
            //       res.redirect('/yay');
            //     } else {
            //       res.render('login', {error: 'invalid password'});
            //     }
    // if a record is found, pass the input password and the found record password in compareSync
    // if passwords match, redirect to yay you logged in!
    // else re-direct to boo
//   }
// })
// })


module.exports = router;
