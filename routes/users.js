var express = require('express');
var router = express.Router();
const uid2 = require('uid2');
const token = uid2(32);
const bcrypt = require('bcrypt');
const Users = require('../models/users')
require('../models/connexion')

/*route users sign up.*/

router.post('/signup', (req, res) => {
  Users.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new Users({
        firstname: req.body.firstname,
        username:  req.body.username,
        password:  hash,
        token:token,
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});


/* route users sign in. */

router.post('/signin', (req, res) => {
  
  Users.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
  });


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
