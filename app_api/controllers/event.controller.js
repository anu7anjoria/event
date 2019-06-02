const mongoose = require('mongoose');
const Event = mongoose.model('event');
const EventRg = mongoose.model('eventrg');
const Order = mongoose.model('order');
const Organiser = mongoose.model('organiser');
const Feedback = mongoose.model('feedback');
const qr = require('qr-image');
const fs = require('fs');
const apiOptions = {
    server : 'http://localhost:4000'
  };
  if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://chitkara-event.herokuapp.com';
  }
module.exports.home = function(rq,res){
    res.render('index.ejs');
}
module.exports.orgPage = function(req,res){
    const abc = req.session.user;
    if(abc.flag == 'student' ){
        res.render('organiser.ejs');
    }else if(abc.flag == 'volunteer'){
        res.redirect('/login');
    }
    
}
module.exports.requestorganiser = function(req,res){
    Organiser.create({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    },function(err,Organiser){
        if(err){
            res.json(err);
        }else{
            res.redirect('/student');
        }
    })
}
module.exports.organiser = function(req,res){
    Organiser.create({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    },function(err,Organiser){
        if(err){
            res.json(err);
        }else{
            res.redirect('/');
        }
    })
}
module.exports.displayOrganisers = function(req,res){
    const abc = req.session.user;
    if(abc.flag == 'student' ){
        res.redirect('/login');
    }else if(abc.flag == 'volunteer'){
        Organiser.find({},(err,Organiser) =>{
            var orgArr = [];
        
            Organiser.forEach(function(Organiser) {
                orgArr.push(Organiser);
            });
            if(err){
                res
                    .status(400)
                    .json(err);
            }else{
             res.render('displayorganisers',{data:orgArr});
            }
        })    }
    
}
module.exports.feedbackPage = function(req,res){
    const abc = req.session.user;
    if(abc.flag == 'student' ){
        res.render('feedback.ejs');
    }else if(abc.flag == 'volunteer'){
        res.redirect('/login');
    }
    
}
module.exports.giveFeedback = function(req,res){
    Feedback.create({
        name:req.body.name,
        email:req.body.email,
        event:req.body.event,
        feedback:req.body.message
    },function(err,Feedback){
        if(err){
            res.json(err);
        }else{
            res.redirect('/student');
        }
    })
}
module.exports.addevent = function(req,res){
    const abc = req.session.user;
    if(abc.flag == 'student' ){
        res.redirect('/login');
    }else if(abc.flag == 'volunteer'){
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
    
}
//https://securegw-stage.paytm.in/theia/processTransaction
module.exports.displayEvent = function(req,res){
    const abc = req.session.user;
    if(abc.flag == 'student' ){
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
    }else if(abc.flag == 'volunteer'){
        res.redirect('/login');
    }
   
}

module.exports.displayStudent = function(req,res){
    const abc = req.session.user;
    if(abc.flag == 'student' ){
        res.redirect('/login');
    }else if(abc.flag == 'volunteer'){
        EventRg.find({}, function(err, EventRg) {
            var emailArr = [];
        
            EventRg.forEach(function(email,eventid) {
              emailArr.push(email,eventid);
            });
            res.render('displaystudent',{data:emailArr});
          });
    }
    
}
module.exports.testadd = function(req,res){
    //get user_sid.email;
    //create list email and event id after pay
    const abc = req.session.user;
    if(abc.flag == 'student' ){
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
                res.redirect(apiOptions.server+'/paywithpaytm?amount='+data);
              
        }
    })
    }else if(abc.flag == 'volunteer'){
        res.redirect('/login');
    }
    
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
    const abc = req.session.user;
    if(abc.flag == 'student' ){
        res.redirect('/login');
    }else if(abc.flag == 'volunteer'){
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
        })    }
   
}