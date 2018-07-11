const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const User = require('./models/users.js');
const Stray = require('./models/strays.js');
const Event = require('./models/events.js');
const bcryptjs = require('bcryptjs');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');


// middleware
/// method override middleware
app.use(methodOverride('_method'));
/// express-session middleware
app.use(session({
    secret: "feedmeseymour",
    resave: false,
    saveUninitialized: false
}));
/// Body Parser
app.use(express.urlencoded({extended:false}));
/// Public folder access
app.use( express.static( 'public' ) );




const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shelter_app';
mongoose.connect(mongoURI, { useNewUrlParser: true },
  () => console.log('MongoDB connection established:', mongoURI)
)


/// User controller access
const userController = require('./controllers/users.js');
app.use('/users', userController);

/// Stray controller access
const strayController = require('./controllers/strays.js');
app.use('/strays', strayController);

//// Sessions controller access
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


app.get('/', (req, res)=>{
  Event.find({}, (err, foundEvents)=>{
  Stray.find({}, (err, foundStrays)=>{
  res.render('index.ejs',
{
  strays : foundStrays,
  currentUser: req.session.currentuser,
  events: foundEvents
})
});
});
});

app.get('/aboutus', (req, res)=>{
  res.render('about-us.ejs',
  {
  currentUser: req.session.currentuser
}
);
});

app.get('/donate', (req, res)=>{
  res.render('donate.ejs',
  {
  currentUser: req.session.currentuser
}
);
});

app.get('/seed', (req, res)=>{
  Event.create(
    [
    {
      title: 'Dog Wash',
      paragraph: 'We will be hosting a dog wash benefit at Pinellas Ale Works. Come by with your pup and donate any amount for a quick wash. PAW will be serving some of their finest beers and we have a Thai-Mex foodtruck serving up some delicious bites.',
      img: 'http://www.communitybark.net/assets/images/mascot-desktop.png',
      date: '7/23',
      Location: 'Pinellas Ale Works, Downtown'
    },
    {
      title: 'Drag Queen Bingo for Strays',
      paragraph: 'We will be co-hosting a Bingo event at Hamburger Mary\'s to benefit our shelter. Come by and compete for some fantastic prizes, including a new grill',
      img: 'http://www.hamburgermarys.com/chicago/i/bingolg.gif',
      date: '7/31',
      Location: 'Hamburger Mary\'s downtown'
    },
    {
      title: 'Cat in the Hat Storytime',
      paragraph: 'We are co-hosting an event with All Children\'s hospital. The Cat in the Hat is visiting to read some great nursery rhymes to children of all ages. We will also have our kittens (in another room to avoid allergic reactions) for playtime. Please come support two of your favorite organizations',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Seuss-cat-hat.gif/220px-Seuss-cat-hat.gif',
      date: '8/02',
      Location: 'Cafe Nervosa, Downtown'
    }
  ],
  (err, data)=>{
             res.redirect('/');
         }
   )
})


app.listen(PORT, ()=>{
  console.log('hi');
})



mongoose.connection.on('open', ()=>{
  console.log('you are connected to mongoose')
})
