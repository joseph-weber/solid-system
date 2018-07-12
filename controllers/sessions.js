const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcryptjs = require('bcryptjs');

///// New session route
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs',
    {
      currentUser: req.session.currentuser
    }
  );
});


///// Log in authentication
router.post('/', (req, res)=>{
  User.findOne({ username: req.body.username}, (err, foundUser)=>{
    if(foundUser === null){
      res.redirect('/sessions/new')
    }
    else {
    if(bcryptjs.compareSync(req.body.password, foundUser.password) ){
      req.session.currentuser = foundUser;
      res.redirect('/');
    } else {
      res.redirect('/sessions/new')
    }
  }
  });
});


///// Show page for session
router.get('/:id', (req, res)=>{
  User.findOne({_id: req.params.id}, (err, foundUser)=>{
  res.render('sessions/show.ejs',
  {
    user: foundUser,
    currentUser: req.session.currentuser
  }
)
});
});


//// Delete sessiona aka logout
router.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
});

module.exports = router;
