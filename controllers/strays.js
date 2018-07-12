const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const Stray = require('../models/strays.js');
const User = require('../models/users.js');




///// Strays Index
router.get('/', (req, res)=>{
  Stray.find({}, (err, foundStrays)=>{
  res.render('strays/index.ejs',
{
  strays : foundStrays,
  currentUser: req.session.currentuser
})
});
});

///// New page for Strays
router.get('/new', (req, res)=>{
  res.render('strays/new.ejs',
  {
    currentUser: req.session.currentuser
  }
);
});

///// Seed route for Strays
router.get('/seed', (req, res)=>{
  Stray.deleteMany({name: 'Patches', breed: 'Cat'}, (err, patches)=>
console.log('Patches'));
  Stray.deleteMany({name: 'Grub', breed: 'Cat'}, (err, grub)=>
console.log('Grub'));
Stray.deleteMany({name: 'Mogli', breed: 'Dog'}, (err, grub)=>
console.log('Grub'));
Stray.deleteMany({name: 'Sam', breed: 'Cat'}, (err, grub)=>
console.log('Grub'));
  Stray.create(
    [
      {
        name: 'Patches',
        breed: 'Cat',
        age: 5,
        goodWithChildren: false,
        color: 'black and white',
        img: 'http://www.thepurringtonpost.com/wp-content/uploads/2016/09/cowcat.jpg',
        description: "Patches is a mellow cat who enjoys the company of adults. Unfortunately due to Patches' years as a stray, she is not great with children. However, she will make the perfect companion for a low-energy household of adults. She loves to cuddle and and enjoys being brushed.",
        currentlyFostered: false
      },
      {
        name: 'Mogli',
        breed: 'Dog',
        age: 1,
        goodWithChildren: true,
        color: 'white',
        img: 'https://i.pinimg.com/736x/d9/5e/8f/d95e8f2c371e358662ea30888f1f48c8--pomeranian-mix-child.jpg',
        description: "Mogli is a great little buddy. He is always up for a walk.",
        currentlyFostered: false
      },
      {
        name: 'Grub',
        breed: 'Cat',
        age: 1,
        goodWithChildren: true,
        color: 'grey',
        img: 'https://i.ebayimg.com/00/s/MTAyNFg3Njg=/z/vzoAAOSw3ZRZAPe4/$_86.JPG',
        description: "Grub is a playful and curious little guy who loves playing and running around. He is excellent with children and has zero experience outside of our shelter, as he was born right here. Grub is looking for a forever home and would love to meet you.",
        currentlyFostered: false
      },
      {
        name: 'Sam',
        breed: 'Cat',
        age: 8,
        goodWithChildren: true,
        color: 'grey and black',
        img: 'https://www.paws-and-effect.com/wp-content/uploads/2014/12/14776695716_0cb30c7ae0_z.jpg',
        description: "Sam is a funny boy who loves to play. He is pretty relaxed during daytime hours and enjoys being pet at night.",
        currentlyFostered: false
      }
    ],
    (err, data)=>{
               res.redirect('/');
           }
     )
   });


///// Show page for strays
router.get('/:id', (req, res)=>{
  Stray.findOne({_id: req.params.id}, (err, foundStray)=>{
  res.render('strays/show.ejs',
  {
    stray: foundStray,
    currentUser: req.session.currentuser
  }
)
})
});


//// Edit page for Strays
router.get('/:id/edit', (req, res)=>{
  Stray.findOne({_id: req.params.id}, (err, foundStray)=>{
    res.render('strays/edit.ejs',
  {
    stray: foundStray,
    currentUser: req.session.currentuser
  }
)
});
});

///// Update route for strays
router.put('/:id', (req, res)=>{
  Stray.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, updatedItem)=>{
    res.redirect('/strays')
});
});

/////// Create route for strays
router.post('/', (req, res)=>{
  Stray.create(req.body, (err, newStray)=>{
    res.redirect('/');
  })
});

/////// Delete route for strays
router.delete('/:id', (req, res)=>{
  Stray.findByIdAndRemove(req.params.id, (err, deletedItem)=>{
    res.redirect('/strays')
  });
});


/////// Fostered route for Strays
router.post('/:id/foster', (req, res)=>{
  Stray.findOneAndUpdate({_id: req.params.id}, {$set: {currentlyFostered: true}},  (err, fosterPet)=>{
    User.update({_id: req.session.currentuser._id}, {$push: {fostering: fosterPet}}, (err, currentUser)=>{
    console.log(currentUser);
    console.log(currentUser.fostering);
    res.redirect('/strays')
  });
})
});



module.exports = router;
