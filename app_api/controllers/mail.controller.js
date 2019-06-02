const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const jsArray = [];
 module.exports.findEmail = async function(req,res){
    User.find({} , (err, User) => {
        if(err){
            res.json(err);
        }User.map(User => {
            jsArray.push(User.email);
        });
    })
    res.redirect('/postmail');
}

module.exports.postmail = async function(req,res){
    var outputText = "New Event Added";
    var recieverEmail = [];
    var transporter = nodemailer.createTransport({
        host: 'mail.google.com',
        port: 587,
        secure: false, // true for 465, false for other ports
     
        service: 'gmail',
        auth: {
            user: "edwardswift28@gmail.com", // generated ethereal user
            pass: ""  // generated ethereal password
           },
    
        tls:{
          rejectUnauthorized:false
        }
       });
  
       let mailOptions = {
        from: '"edwardswift28" <edwardswift28@gmail.com>', // sender address
        to: [jsArray], // list of receivers
        subject: 'Contest Info', // Subject line
        text: outputText, // plain text body
        html: outputText // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }else{
            res.redirect('/volunteer')
        }
    });
  }

  module.exports.findEmail2 = async function(req,res){
    User.find({} , (err, User) => {
        if(err){
            res.json(err);
        }User.map(User => {
            jsArray.push(User.email);
        });
    })
    res.redirect('/postmail2');
}

  module.exports.postmail2 = async function(req,res){
    var outputText = "New Event Updated";
    var recieverEmail = [];
    var transporter = nodemailer.createTransport({
        host: 'mail.google.com',
        port: 587,
        secure: false, // true for 465, false for other ports
     
        service: 'gmail',
        auth: {
            user: "edwardswift28@gmail.com", // generated ethereal user
            pass: ""  // generated ethereal password
           },
    
        tls:{
          rejectUnauthorized:false
        }
       });
  
       let mailOptions = {
        from: '"edwardswift28" <edwardswift28@gmail.com>', // sender address
        to: [jsArray], // list of receivers
        subject: 'Contest Info', // Subject line
        text: outputText, // plain text body
        html: outputText // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }else{
            res.redirect('/volunteer/displayevent')
        }
    });
  }
