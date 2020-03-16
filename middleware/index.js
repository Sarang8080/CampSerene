var CampGround = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.campOwner = function(req,res,next){
if(req.isAuthenticated()){
        CampGround.findById(req.params.id,function(err,foundCamp){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundCamp.author.id.equals(req.user._id)){ //to check whether author and user are the same
                     next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
           }
    
}

middlewareObj.commentOwner=function(req,res,next){

    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){ //to check whether author and user are the same
                    return next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
           }
    
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Log in!")
    res.redirect("/login");
}

module.exports = middlewareObj;