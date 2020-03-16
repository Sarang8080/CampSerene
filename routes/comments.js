var express = require("express");
var router = express.Router();
var CampGround = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");


//COMMENT ROUTE
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req, res){
    CampGround.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground})
        }
    })
    })
    
    router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
        CampGround.findById(req.params.id,function(err,campground){
            if(err){
                res.redirect("/campgrounds");
            }
            else{
                Comment.create(req.body.comment,function(err,comment){
                    if(err){
                        console.log(err);
                    }
                    else{
                        //add user name and id to the comment
                         comment.author.id = req.user._id;
                         comment.author.username = req.user.username;
                         //save comment
                         comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        req.flash("success","Comment Added");
                        res.redirect("/campgrounds/"+ campground._id);
                    }
                })
            }
        })
    })

//EDIT ROUTE FOR COMMENT
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.commentOwner,function(req,res){
    Comment.findById(req.params.comment_id,function(err,editComment){ //we want the text of the comment so taking that by id
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit",{campground_id:req.params.id,comment:editComment}); //to get the id of campground
        }
    })
    
})

//Update route for comment
router.put("/campgrounds/:id/comments/:comment_id",middleware.commentOwner,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//DELETE ROUTE FOR COMMENT
router.delete("/campgrounds/:id/comments/:comment_id",middleware.commentOwner,function(req,res){
      Comment.findByIdAndRemove(req.params.comment_id,function(err,deleteComment){
          if(err){
              res.redirect("back");
          }
          else{
              res.redirect("/campgrounds/"+ req.params.id);
          }
      })
})
    



module.exports = router;