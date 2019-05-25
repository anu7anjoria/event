const mongoose = require('mongoose');
const Event = new mongoose.Schema({
    name:String,
    description:String,
    cost:Number,
})

var event = mongoose.model('event', Event);
module.exports = event;