const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: String,
  password: String,
  name: String,
  hours: [Number],
  catPref: Boolean,
  dogPref: Boolean,
  fosterAble: Boolean,
  fostering: [String],
  Admin: Boolean
},
{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
