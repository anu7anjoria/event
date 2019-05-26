const mongoose = require('mongoose');
const Event = mongoose.model('event');
const EventRg = mongoose.model('eventrg');
const Order = mongoose.model('order');
const qr = require('qr-image');
const fs = require('fs');
module.exports.home = function(rq,res){
    res.render('index.ejs');
}
module.exports.addevent = function(req,res){
    Event.create({
        name:req.body.ename,
        description:req.body.description,
        cost:req.body.cost,
        eventid:req.body.eventid,

        //startdate:req.body.startdate,
        enddate:req.body.enddate,

        venuedate:req.body.venuedate,
        venuetime:req.body.venuetime,
        phone:req.body.phone,
        location:req.body.location
    },function(err,Event){
        if(err){
            res.json(err);
        }else{
            res.redirect('/send/email');
        }
    })
}
//https://securegw-stage.paytm.in/theia/processTransaction
module.exports.displayEvent = function(req,res){
    if(!req.session.user){
        res.redirect('/login');
    }
    Event.find({},(err,Event) =>{
        var eventArr = [];
    
        Event.forEach(function(Event) {
            eventArr.push(Event);
        });
        if(err){
            res
                .status(400)
                .json(err);
        }else{
         res.render('displayevent',{data:eventArr});
        }
    })
}

module.exports.displayStudent = function(req,res){
    if(!req.session.user){
        res.redirect('/login');
    }
    EventRg.find({}, function(err, EventRg) {
        var emailArr = [];
    
        EventRg.forEach(function(email,eventid) {
          emailArr.push(email,eventid);
        });
        res.render('displaystudent',{data:emailArr});
      });
}
module.exports.testadd = function(req,res){
    //get user_sid.email;
    //create list email and event id after pay
    if(!req.session.user){
        res.redirect('/login');
    }
    user_id = req.session.user;
    var emailId = user_id.email;
    EventRg.create({
        email:emailId,
        eventid:req.params.eventid,
        cost:req.params.cost
    },function(err,EventRg){
        if(err){
            res.send(err);
        }else{
            const data = req.params.cost;
            if (process.env.NODE_ENV === 'production') {
                res.redirect('https://chitkara-event.herokuapp.com/paywithpaytm?amount='+data);
                console.log('ok');
              }else{
                res.redirect('/paywithpaytm?amount='+data);
                console.log('ok');

              }
              
        }
    })
}
module.exports.QRgen = function(req,res){
    let qr_txt = req.params.orderid;
    Order.create({
        orderid:qr_txt
    },function(err,Order){
        if(err){
            res.send(err);
        }else{
            
        }
    })
    // Generate QR Code from text
    var qr_png = qr.imageSync(qr_txt,{ type: 'png'})

    // Generate a random file name 
    let qr_code_file_name = new Date().getTime() + '.png';

    fs.writeFileSync('./public/qr/' + qr_code_file_name, qr_png, (err) => {
        if(err){
            console.log(err);
        }
        
    })

    res.render('qr-code',{data:qr_code_file_name});
}

module.exports.updateEvent = function(req,res){
    Event.findOneAndUpdate({ eventid: req.params.eventid }, 
        { $set: { name: req.body.name ,
        description:req.body.description,
        cost:req.body.cost,
        eventid:req.body.eventid,

        //startdate:req.body.startdate,
        enddate:req.body.enddate,

        venuedate:req.body.venuedate,
        venuetime:req.body.venuetime,
        phone:req.body.phone,
        location:req.body.location
        
        } }, { new: true }, function(err, doc) {
            if(err){
                res.status(404).json(err);
            }else{
                res.redirect('/send/email2');
                //res.redirect('/volunteer/displayevent');
            }
    });
}
module.exports.deleteEvent = function(req,res){
    Event.findOneAndRemove({
        eventid:req.params.eventid
    },(err,Event) =>{
        if(err){
            res
                .status(400)
                .json(err);
        }else{
            res.redirect('/volunteer/displayevent')
        }
    })
}
module.exports.displayEventV = function(req,res){
    Event.find({},(err,Event) =>{
        var eventArr = [];
    
        Event.forEach(function(Event) {
            eventArr.push(Event);
        });
        if(err){
            res
                .status(400)
                .json(err);
        }else{
         res.render('displayeventv',{data:eventArr});
        }
    })
}