const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');
const User = require('../models/events.js');



////// Events Index
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

////// New page for events
router.get('/new', (req, res)=>{
  res.render('events/new.ejs',
  {
    currentUser: req.session.currentuser
  }
);
});


////// Create route for events
router.post('/', (req, res)=>{
  Event.create(req.body, (err, newEvent)=>{
    res.redirect('/');
  })
});

////// Edit page for events
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

////// Update route for events
router.put('/:id', (req, res)=>{
  Event.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, updatedEvent)=>{
    res.redirect('/events')
});
});


////// Delete Routes for events
router.delete('/:id', (req, res)=>{
  Event.findByIdAndRemove(req.params.id, (err, deletedEvent)=>{
    res.redirect('/events')
  });
});



////// Show page for events
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

///// Attempted to update user's account but could not
router.post('/:id/attend', (req, res)=>{
  Event.update({_id: req.params.id}, {$pull: {attendees: req.session.currentuser.name}}, (err, grub)=>{
    Event.update({_id: req.params.id}, {$push: {attendees: req.session.currentuser.name}},  (err, attendee)=>{
      User.update({username: req.session.currentuser}, {$pull: {events: Event.req.params.id.title}}, (err, updatedUserPull)=>{
        console.log(eventToManipulate.title);
        User.update({username: req.session.currentuser}, {$push: {events: Event.req.params.id.title}}, (err, updatedUserPush)=>{
          console.log(updatedUserPush)
          res.redirect('/');
        });
      });
    });
  });
});


//// Seed route for events

router.get('/seed', (req, res)=>{
  Event.create(
    [
    {
      title: 'Dog Wash',
      paragraph: 'We will be hosting a dog wash benefit at Pinellas Ale Works. Come by with your pup and donate any amount for a quick wash. PAW will be serving some of their finest beers and we have a Thai-Mex foodtruck serving up some delicious bites.',
      img: 'http://www.communitybark.net/assets/images/mascot-desktop.png',
      date: '7/23',
      Location: 'Pinellas Ale Works, Downtown',
      attendees: []
    },
    {
      title: 'Drag Queen Bingo for Strays',
      paragraph: 'We will be co-hosting a Bingo event at Hamburger Mary\'s to benefit our shelter. Come by and compete for some fantastic prizes, including a new grill',
      img: 'http://www.hamburgermarys.com/chicago/i/bingolg.gif',
      date: '7/31',
      Location: 'Hamburger Mary\'s downtown',
      attendees: []
    },
    {
      title: 'Cat in the Hat Storytime',
      paragraph: 'We are co-hosting an event with All Children\'s hospital. The Cat in the Hat is visiting to read some great nursery rhymes to children of all ages. We will also have our kittens (in another room to avoid allergic reactions) for playtime. Please come support two of your favorite organizations',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Seuss-cat-hat.gif/220px-Seuss-cat-hat.gif',
      date: '8/02',
      Location: 'Cafe Nervosa, Downtown',
      attendees: []
    }
  ],
  (err, data)=>{
             res.redirect('/');
         }
   )
})


module.exports = router;
