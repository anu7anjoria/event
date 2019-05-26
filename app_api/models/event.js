const mongoose = require('mongoose');
const Event = new mongoose.Schema({
    name:String,
    description:String,
    cost:Number,
    eventid:Number,
    
    startdate:{type:Date,default:Date.now},
    enddate:{type:Date},

    venuedate:{type:Date},
    venuetime:String,
    phone:Number,
    location:String
})

var event = mongoose.model('event', Event);
module.exports = event;