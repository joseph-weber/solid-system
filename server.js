const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app'

console.log('this works');


const userController = require('./controllers/users.js');
app.use(userController);


app.get('/', (req, res)=>{
  res.render("index.ejs");
})


app

app.listen(PORT, ()=>{
  console.log('hi');
})

mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.connection.on('open', ()=>{
  console.log('you are connected to mongoose')
})
