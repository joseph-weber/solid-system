const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('this works');


app.get('/', (req, res)=>{
  res.send('hi');
})

app.listen(PORT, ()=>{
  console.log('hi');
})
