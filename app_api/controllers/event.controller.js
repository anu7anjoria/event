const mongoose = require('mongoose');
const Event = mongoose.model('event');
const EventRg = mongoose.model('eventrg');
module.exports.home = function(rq,res){
    res.send('homepage');
}
module.exports.addevent = function(req,res){
    Event.create({
        name:req.body.ename,
        description:req.body.description,
        cost:req.body.cost
    },function(err,Event){
        if(err){
            res.json(err);
        }else{
            res.send('done');
        }
    })
}

module.exports.register = function(req,res){
    
}

module.exports.payment = function(req,res){
    
}