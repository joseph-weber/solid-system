const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  password: String,
  name: String,
  hours: Array,
  catPref: Boolean,
  dogPref: Boolean,
  fosterAble: Boolean,
  fostering: Array,
  Admin: Boolean
},

{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
