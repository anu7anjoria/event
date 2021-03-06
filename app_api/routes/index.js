var ctrlMain = require("../controllers/mail.controller");
const ctrlEvent = require('../controllers/event.controller');
var express = require('express');
var router = express.Router();

router.get('/',ctrlEvent.home);
router.post('/',ctrlEvent.organiser);

router.get('/volunteer/addevent',function(req,res){
    if(!req.session.user){
        res.redirect('/login');
    }
    res.render('event.ejs');
});
router.post('/volunteer/addevent',ctrlEvent.addevent);
router.get('/volunteer/display/student',ctrlEvent.displayStudent);
router.get('/volunteer/displayorganiser',ctrlEvent.displayOrganisers);
router.get('/volunteer/displayevent',ctrlEvent.displayEventV);
router.get('/volunteer/delete/:eventid',ctrlEvent.deleteEvent);


//router.get('/volunteer/update/:eventid',ctrlEvent.updateEvent);
router.get('/volunteer/up/:eventid',function(req,res){
    const val = req.params.eventid;
    res.render('update',{val:val});
})
router.post('/volunteer/up/:eventid',ctrlEvent.updateEvent);


router.get('/postmail',ctrlMain.postmail);
router.get('/send/email',ctrlMain.findEmail);
router.get('/send/email2',ctrlMain.findEmail2);
router.get('/postmail2',ctrlMain.postmail2);

router.get('/student/displayevent',ctrlEvent.displayEvent);
router.get('/student/givefeedback',ctrlEvent.feedbackPage);
router.post('/student/givefeedback',ctrlEvent.giveFeedback);
router.get('/student/requestOrganiser',ctrlEvent.orgPage);
router.post('/student/requestOrganiser',ctrlEvent.requestorganiser);

router.get('/student/addevent/:eventid/:cost',ctrlEvent.testadd);

router.get('/qr-code/:orderid',ctrlEvent.QRgen);
router.get('/qr-code/image',function(req,res){
    res.render('qr-code');
})
module.exports = router;
