const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const organiserSchema = new mongoose.Schema({
   
    name:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
});

var organiser = mongoose.model('organiser', organiserSchema);
module.exports = organiser;