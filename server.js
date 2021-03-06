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

///// Events controller access
const eventsController = require('./controllers/events.js');
app.use('/events', eventsController);

///// Index page
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

/// About us page
app.get('/aboutus', (req, res)=>{
  res.render('about-us.ejs',
  {
  currentUser: req.session.currentuser
}
);
});

/// Donate page
app.get('/donate', (req, res)=>{
  res.render('donate.ejs',
  {
  currentUser: req.session.currentuser
}
);
});

/// Listen Route
app.listen(PORT, ()=>{
  console.log('hi');
})


//// Checking connection
mongoose.connection.on('open', ()=>{
  console.log('you are connected to mongoose')
})
