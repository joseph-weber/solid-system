const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');




router.get('/', (req, res)=>{
  Event.find({}, (err, foundEvents)=>{
    res.render('events/index.ejs',
  {
    events: foundEvents,
    currentUser: req.session.currentuser
  }
)
});
});

router.get('/new', (req, res)=>{
  res.render('events/new.ejs',
  {
    currentUser: req.session.currentuser
  }
);
});

router.post('/', (req, res)=>{
  Event.create(req.body, (err, newEvent)=>{
    res.redirect('/');
  })
});

router.get('/:id/edit', (req, res)=>{
  Event.findOne({_id: req.params.id}, (err, foundEvent)=>{
    res.render('events/edit.ejs',
  {
    event: foundEvent,
    currentUser: req.session.currentuser
  }
)
});
});

router.put('/:id', (req, res)=>{
  Event.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, updatedEvent)=>{
    res.redirect('/events')
});
});

router.delete('/:id', (req, res)=>{
  Event.findByIdAndRemove(req.params.id, (err, deletedEvent)=>{
    res.redirect('/events')
  });
});




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


router.post('/:id/attend', (req, res)=>{
  Event.update({_id: req.params.id}, {$pull: {attendees: req.session.currentuser.name}}, (err, grub)=>{
console.log('Grub');
});
  Event.update({_id: req.params.id}, {$push: {attendees: req.session.currentuser.name}},  (err, attendee)=>{
  res.redirect('/events')
});
});
module.exports = router;
