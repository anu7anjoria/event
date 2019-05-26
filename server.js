const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var session = require('express-session');
var session = require('express-session');
require('./app_api/models/db');
var cookieParser = require('cookie-parser');
const indexRouter = require('./app_api/routes/index');
const app = express();
const User = require('./app_api/models/user');
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const {initPayment, responsePayment} = require("./paytm/services/index");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.use(express.static('./public'))
app.set("view engine", "ejs");

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
  }));  

app.use((req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
        }
        next();
});
    
  // middleware function to check for logged-in users
  var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      user_id = req.session.user;
      if(user_id.flag == 'student' ){
          res.redirect('/student');
      }else if(user_id.flag == 'volunteer'){
          res.redirect('/volunteer');
      }
    } else {
        next();
    }    
  };
  

// route for user signup
app.route('/signup')
    .get(sessionChecker, (req, res) => {
        res.render('signup.ejs',{title:'Signup'});
    })
    .post((req, res) => {
        User.create({
            flag:req.body.isOther,
            email: req.body.email,
            password: req.body.password,
            phone:req.body.phone,
            subjectName:req.body.subjectName,
            facultyName:req.body.facultyName
        })
        .then(user => {
            req.session.user = user;  //===========================\
            if(user.flag == 'student' ){
                res.redirect('/student');
            }else if(user.flag == 'volunteer'){
                res.redirect('/volunteer');
            }
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });
    app.route('/signup2')
    .get((req, res) => {
        res.render('signup2.ejs',{title:'Add Admin'});
    })
    .post((req, res) => {
        User.create({
            flag:req.body.isOther,
            email: req.body.email,
            password: req.body.password,
            phone:req.body.phone,
            name:req.body.name,
            univroll:req.body.univroll
        },
        function(err,User){
            if(err){
                res.json(err);
            }else{
                res.redirect('/volunteer');
            }
        })
    });

// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render('login.ejs',{title:'Login'});
    })
    .post((req, res) => {
           var email = req.body.lemail;
           var password = req.body.lpassword;

        User.findOne({ email: email ,password:password}).then(function (user) {
            if (!user) {
                res.redirect('/login');
            }
             else {
                req.session.user = user; //===========================
                if(user.flag == 'student' ){
                    res.redirect('/student');
                }else if(user.flag == 'volunteer'){
                    res.redirect('/volunteer');
                }
            }
        });
    });

    app.get('/logout', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
      });

app.get("/paywithpaytm", (req, res) => {
    initPayment(req.query.amount).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            res.send(error);
        }
    );
});

app.post("/paywithpaytmresponse", (req, res) => {

    responsePayment(req.body).then(
        success => {
            res.render("response.ejs", {resultData: "true", responseData: success});
        },
        error => {
            res.send(error);
        }
    );
});
// app.post("/paywithpaytmresponse", (req, res) => {

//     responsePayment(req.body).then(
//         success => {
//             res.render("qr-code.ejs", {resultData: "true", responseData: success});
//         },
//         error => {
//             res.send(error);
//         }
//     );
// });
app.get('/student', (req, res) => {
    const abc = req.session.user;
    if (abc.flag == 'student') {
        res.render(__dirname + '/views/student.ejs',{title:'Student | Dashboard'});
    } else {
        res.redirect('/login');
    }
  });
  app.get('/volunteer', (req, res) => {
      const abc = req.session.user;
    if (abc.flag == 'volunteer' ) {
        res.render(__dirname + '/views/volunteer.ejs',{title:'Volunteer | Dashboard'});
    } else {
        res.redirect('/login');
    }
  });
  app.use('/',function(req,res,next){
    res.header('Access-Control-Allow-Origin','http://localhost:4000');
    res.header('Access-Control-Allow-Origin','Origin,X-Requested-With,Content-Type,Accept');
   next();
  });
app.use('/',indexRouter);

app.listen(PORT, () => {
    console.log("Running on " + PORT);
});
