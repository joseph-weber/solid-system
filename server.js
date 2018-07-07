const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const User = require('./models/users.js');

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app'

console.log('this works');


const userController = require('./controllers/users.js');
app.use(userController);


app.get('/', (req, res)=>{
  res.render("index.ejs");
})

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

mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.connection.on('open', ()=>{
  console.log('you are connected to mongoose')
})
