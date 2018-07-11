const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String,
  name: String,
  hours: [Number],
  catPref: Boolean,
  dogPref: Boolean,
  fosterAble: Boolean,
  fostering: Array,
  Admin: Boolean
},
{timestamps: true})



const eventSchema = Schema({
  title: String,
  paragraph: String,
  img: String,
  date: String,
  Location: String,
  attendees: [User]
},
{timestamps: true})




const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
