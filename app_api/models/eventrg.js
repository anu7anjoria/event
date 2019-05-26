const mongoose = require('mongoose');
const EventRg = new mongoose.Schema({
    eventName:String,
    email:[{type:String}],
    eventid:Number
})

var eventrg = mongoose.model('eventrg', EventRg);
module.exports = eventrg;