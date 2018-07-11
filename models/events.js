const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = Schema({
  title: String,
  paragraph: String,
  img: String,
  date: String,
  Location: String
},
{timestamps: true})




const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
