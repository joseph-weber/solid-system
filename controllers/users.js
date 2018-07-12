const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/users.js');

////// Users new page
router.get('/new', (req, res)=>{
  res.render('users/new.ejs',
  {
    currentUser: req.session.currentuser
  }
);
});

////// Users new route
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

////// Users Seed route
router.get('/seed', (req, res)=>{
  User.create(
    [
    {
      username: 'Stevie25',
      password: bcryptjs.hashSync('billgleason', bcryptjs.genSaltSync(10)),
      name: 'Steve Mulcahy',
      hours: [8, 9, 10, 11, 12, 1],
      catPref: true,
      dogPref: false,
      fosterAble: true,
      fostering: [],
      Admin: true,
      events: []
    },
    {
      username: 'Jackattack713',
      password: bcryptjs.hashSync('mogli', bcryptjs.genSaltSync(10)),
      name: 'Jackie Frumkin',
      hours: [8, 9, 10, 11, 12, 1],
      catPref: true,
      dogPref: true,
      fosterAble: true,
      fostering: [],
      Admin: true,
      events: []
    },
    {
      username: 'westsidestory4eva',
      password: bcryptjs.hashSync('musicmansux', bcryptjs.genSaltSync(10)),
      name: 'Zach Frumkin',
      hours: [8, 9, 10, 11, 12, 1],
      catPref: false,
      dogPref: true,
      fosterAble: true,
      fostering: [],
      Admin: false,
      events: []
    },
    {
      username: 'canyouhangtonight',
      password: bcryptjs.hashSync('ericaerickaarickaarica', bcryptjs.genSaltSync(10)),
      name: 'Steve Rubin',
      hours: [],
      catPref: false,
      dogPref: false,
      fosterAble: false,
      fostering: [],
      Admin: false,
      events: []
    }
  ],
  (err, data)=>{
             res.redirect('/');
         }
   )
})


////// Users Edit/Update route
router.get('/:id/edit', (req, res)=>{
  User.findOne({_id: req.params.id}, (err, foundUser)=>{
  res.render('users/edit.ejs',
  {
    user: foundUser,
    currentUser: req.session.currentuser
  }
)
})
})

/////// Delete route for strays
router.delete('/:id', (req, res)=>{
  req.session.destroy(()=>{
  User.findByIdAndRemove(req.params.id, (err, deletedItem)=>{
    res.redirect('/')
  });
  });
});




// router.post('/', (req, res)=>{
//   req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync(10));
//     User.create(req.body, (err, createdUser)=>{
//         res.redirect('/');
// });
// });


module.exports = router;
