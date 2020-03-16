var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users");


router.get("/",function(req,res){
    res.render("landing");
})


/********************/
//Auth routes

//Register route
router.get("/register",function(req,res){
    res.render("register")
})

//Post Register route
router.post("/register",function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            
            req.flash("error", err.message); //object to message thats why .message
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to CampSerene: " + user.username);
           res.redirect("/campgrounds");
        });
    });
});

//Login Route
router.get("/login",function(req,res){
    res.render("login")
})

//Login post route
//middleware
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

//logout route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged Out Successfully")
    res.redirect("/campgrounds")
})

//middleware that checks whether user is logged in or not
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;