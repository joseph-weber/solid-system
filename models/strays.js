const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const straySchema = Schema({
  name: String,
  breed: String,
  age: Number,
  goodWithChildren: Boolean,
  color: String,
  img: String,
  description: String,
  currentlyFostered: Boolean
},
{timestamps: true})

const Stray = mongoose.model('Stray', straySchema);

module.exports = Stray;
