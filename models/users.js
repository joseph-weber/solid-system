const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  hours: Array,
  catPref: Boolean,
  dogPref: Boolean,
  fosterAble: Boolean,
  fostering: Array
})

const User = mongoose.model('User', userSchema);

module.exports = User;
