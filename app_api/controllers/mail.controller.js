const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const jsArray = [];
module.exports.findEmail = function(req,res){
    User.find({} , (err, User) => {
        if(err){
            res.json(err);
        }
        User.map(user => {
            jsArray = user.email;
        })
    })
}
module.exports.postmail = function(req,res){
    var outputText = "test email";
    var recieverEmail = [];
    var transporter = nodemailer.createTransport({
        host: 'mail.google.com',
        port: 587,
        secure: false, // true for 465, false for other ports
     
        service: 'gmail',
        auth: {
            user: "edwardswift28@gmail.com", // generated ethereal user
            pass: "analkumargta"  // generated ethereal password
           },
    
        tls:{
          rejectUnauthorized:false
        }
       });
  
       let mailOptions = {
        from: '"edwardswift28" <edwardswift28@gmail.com>', // sender address
        to: [recieverEmail], // list of receivers
        subject: 'Counselling Info', // Subject line
        text: outputText, // plain text body
        html: outputText // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }else{
            return console.log('done');
        }
    });
  }