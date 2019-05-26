const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const feedbackSchema = new mongoose.Schema({
   
    name:{
        type:String
    },
    email:{
        type:String
    },
    event:{
        type:String
    },
    feedback:{
        type:String
    }
});

var feedback = mongoose.model('feedback', feedbackSchema);
module.exports = feedback;