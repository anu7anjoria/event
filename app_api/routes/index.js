var ctrlMain = require("../controllers/mail.controller");
const ctrlEvent = require('../controllers/event.controller');
var express = require('express');
var router = express.Router();
router.get('/send/email',ctrlMain.findEmail);
router.get('/student',function(req,res){
    res.send('stduent page');
});
router.get('/volunteer',function(req,res){
    res.send('volunteer page');
});
router.get('/',ctrlEvent.home);
router.get('/volunteer/addevent',function(req,res){
    res.render('event.ejs');
});
router.post('/volunteer/addevent',ctrlEvent.addevent);

router.get('/student/register/event',function(req,res){
    res.render('register.ejs');
});
router.post('/student/register/event',ctrlEvent.register);

router.get('/student/register/event/pay',function(req,res){
    res.render('payment.ejs');
});
router.post('/student/register/event/pay',ctrlEvent.payment);
module.exports = router;
//kill $(lsof -t -i:3000)