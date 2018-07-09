const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const Stray = require('../models/strays.js');


router.get('/', (req, res)=>{
  Stray.find({}, (err, foundStrays)=>{
  res.render('strays/index.ejs',
{
  strays : foundStrays
})
});
});

router.get('/new', (req, res)=>{
  res.render('strays/new.ejs');
});

router.get('/:id', (req, res)=>{
  Stray.findOne({_id: req.params.id}, (err, foundStray)=>{
  res.render('strays/show.ejs',
  {
    stray: foundStray
  }
)
})
});

router.get('/:id/edit', (req, res)=>{
  Stray.findOne({_id: req.params.id}, (err, foundStray)=>{
    res.render('strays/edit.ejs',
  {
    stray: foundStray
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



module.exports = router;
