const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/users.js');


router.get('/new', (req, res)=>{
  res.render('users/new.ejs');
});

router.post('/', (req, res) => {
  // console.log(req.body);
  if(req.body.catPref === "on"){
    req.body.catPref = true;
  } else {
    req.body.catPref = false;
  };
  if(req.body.dogPref === "on"){
    req.body.dogPref = true;
  } else {
    req.body.dogPref = false;
  };
  if(req.body.fosterAble === "on"){
    req.body.fosterAble = true;
  } else {
    req.body.fosterAble = false;
  };
  req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10));
  User.create(req.body, (error, createdUser)=>{
    res.redirect('/');
    console.log(req.body);
    console.log(createdUser);
  })
});


// router.post('/', (req, res)=>{
//   req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10));
//     User.create(req.body, (err, createdUser)=>{
//         res.redirect('/');
// });
// });


module.exports = router;
