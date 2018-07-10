const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const Stray = require('../models/strays.js');
const User = require('../models/users.js');

router.get('/', (req, res)=>{
  Stray.find({}, (err, foundStrays)=>{
  res.render('strays/index.ejs',
{
  strays : foundStrays,
  currentUser: req.session.currentuser
})
});
});

router.get('/new', (req, res)=>{
  res.render('strays/new.ejs',
  {
    currentUser: req.session.currentuser
  }
);
});

router.get('/seed', (req, res)=>{
  Stray.deleteMany({name: 'Patches', breed: 'Cat'}, (err, patches)=>
console.log('Patches'));
  Stray.deleteMany({name: 'Grub', breed: 'Cat'}, (err, grub)=>
console.log('Grub'));
  Stray.create(
    [
      {
        name: 'Patches',
        breed: 'Cat',
        age: 5,
        color: 'black and white',
        img: 'http://www.thepurringtonpost.com/wp-content/uploads/2016/09/cowcat.jpg'
      },
      {
        name: 'Grub',
        breed: 'Cat',
        age: 1,
        color: 'grey',
        img: 'https://i.ebayimg.com/00/s/MTAyNFg3Njg=/z/vzoAAOSw3ZRZAPe4/$_86.JPG'
      }
    ],
    (err, data)=>{
               res.redirect('/');
           }
     )
   });

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

router.put('/:id', (req, res)=>{
  Stray.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, updatedItem)=>{
    res.redirect('/strays')
});
});


router.post('/', (req, res)=>{
  Stray.create(req.body, (err, newStray)=>{
    res.redirect('/');
  })
});

router.delete('/:id', (req, res)=>{
  Stray.findByIdAndRemove(req.params.id, (err, deletedItem)=>{
    res.redirect('/strays')
  });
});

router.post('/:id/foster', (req, res)=>{
  Stray.findById(req.params.id, (err, fosterPet)=>{
    User.update({_id: req.session.currentuser._id}, {$push: {fostering: fosterPet.name}}, (err, currentUser)=>{
    console.log(currentUser);
    console.log(fosterPet.name);
    console.log(currentUser.fostering);
    res.redirect('/strays')
  });
})
});



module.exports = router;
