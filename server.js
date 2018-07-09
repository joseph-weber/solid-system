const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const User = require('./models/users.js');
const Stray = require('./models/strays.js');
const bcryptjs = require('bcryptjs');
const methodOverride = require('method-override');


// middleware
app.use(methodOverride('_method'));


/// Mongoose Connection and DB generator
const mongoose = require('mongoose');
/// Body Parser
app.use(express.urlencoded({extended:false}));

/// Public folder access
app.use( express.static( 'public' ) );


const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app';
mongoose.connect(mongoURI, { useNewUrlParser: true },
  () => console.log('MongoDB connection established:', mongoURI)
)


/// User controller access
const userController = require('./controllers/users.js');
app.use('/users', userController);

/// Stray controller access
const strayController = require('./controllers/strays.js');
app.use('/strays', strayController);


app.get('/', (req, res)=>{
  Stray.find({}, (err, foundStrays)=>{
  res.render('index.ejs',
{
  strays : foundStrays
})
});
});

app.get('/seed/new', (req, res)=>{
  User.create(
    [
    {
      username: 'Stevie25',
      password: 'billgleason',
      name: 'Steve Mulcahy',
      hours: [8, 9, 10, 11, 12, 1],
      catPref: true,
      dogPref: false,
      fosterAble: true,
      fostering: []
    },
    {
      username: 'Jackattack713',
      password: 'mogli',
      name: 'Jackie Frumkin',
      hours: [8, 9, 10, 11, 12, 1],
      catPref: true,
      dogPref: true,
      fosterAble: true,
      fostering: ['Salmon']
    },
    {
      username: 'westsidestory4eva',
      password: 'musicmansux',
      name: 'Zach Frumkin',
      hours: [8, 9, 10, 11, 12, 1],
      catPref: false,
      dogPref: true,
      fosterAble: true,
      fostering: []
    },
    {
      username: 'canyouhangtonight',
      password: 'ericaerickaarickaarica',
      name: 'Steve Rubin',
      hours: [],
      catPref: false,
      dogPref: false,
      fosterAble: false,
      fostering: ['Erica']
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
