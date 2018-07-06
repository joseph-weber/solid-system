const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app'

console.log('this works');


app.get('/', (req, res)=>{
  res.send('hi');
})

app.listen(PORT, ()=>{
  console.log('hi');
})

mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.connection.on('open', ()=>{
  console.log('you are connected to mongoose')
})
