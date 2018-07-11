const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');

router.get('/:id', (req, res)=>{
  Event.findOne({_id: req.params.id}, (err, foundEvent)=>{
    res.render('events/show.ejs',
  {
    event: foundEvent,
    currentUser: req.session.currentuser
  }
)
});
});


module.exports = router;
