const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Events = require('./events.js');



const userSchema = Schema({
  username: String,
  password: String,
  name: String,
  hours: [Number],
  catPref: Boolean,
  dogPref: Boolean,
  fosterAble: Boolean,
  fostering: Array,
  Admin: Boolean,
  events: [String]
},
{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
