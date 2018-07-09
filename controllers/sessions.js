const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcryptjs = require('bcryptjs')


router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

router.post('/', (req, res)=>{
  User.findOne({ username: req.body.username}, (err, foundUser)=>{
    console.log(req.body);
    console.log(foundUser);
    if(bcryptjs.compareSync(req.body.password, foundUser.password) ){
      req.session.currentuser = foundUser;
      console.log(req.session);
      res.redirect('/');
    } else {
      res.redirect('/sessions/new')
    }
  });
});

router.get('/:id', (req, res)=>{
  User.findOne({_id: req.params.id}, (err, foundUser)=>{
  res.render('sessions/show.ejs',
  {
    user: foundUser
  }
)
});
});


module.exports = router;
