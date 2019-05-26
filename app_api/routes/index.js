var ctrlMain = require("../controllers/mail.controller");
const ctrlEvent = require('../controllers/event.controller');
var express = require('express');
var router = express.Router();

router.get('/',ctrlEvent.home);

router.get('/volunteer/addevent',function(req,res){
    if(!req.session.user){
        res.redirect('/login');
    }
    res.render('event.ejs');
});
router.post('/volunteer/addevent',ctrlEvent.addevent);
router.get('/volunteer/display/student',ctrlEvent.displayStudent);
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


router.get('/student/displayevent',ctrlEvent.displayEvent);

router.get('/student/addevent/:eventid/:cost',ctrlEvent.testadd);

router.get('/qr-code/:orderid',ctrlEvent.QRgen);
router.get('/qr-code/image',function(req,res){
    res.render('qr-code');
})
module.exports = router;
//kill $(lsof -t -i:4000)

// MID=UrbGhK13213122633792
// PAYTM_MERCHANT_KEY=eQxCU7CTpb8jZT7q
// WEBSITE=DEFAULT

// MID=bQrfeo02462023666025
// PAYTM_MERCHANT_KEY=FeuUj@Wiw&PzW2VT
// WEBSITE=WEBSTAGING