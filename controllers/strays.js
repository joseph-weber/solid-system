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



module.exports = router;
