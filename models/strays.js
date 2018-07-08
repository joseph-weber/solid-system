const mongoose = require('mongoose');

const straySchema = mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  color: String,
  img: String
},
{timestamps: true})

const Stray = mongoose.model('Stray', straySchema);

module.exports = Stray;
