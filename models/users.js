const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Stray = new Schema({
  name: String,
  breed: String,
  age: Number,
  color: String,
  img: String,
  currentlyFostered: Boolean
},
{timestamps: true})

const userSchema = Schema({
  username: String,
  password: String,
  name: String,
  hours: [Number],
  catPref: Boolean,
  dogPref: Boolean,
  fosterAble: Boolean,
  fostering: [Stray],
  Admin: Boolean
},
{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
