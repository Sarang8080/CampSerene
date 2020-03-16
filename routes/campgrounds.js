var express = require("express");
var router = express.Router();
var CampGround = require("../models/campground");
var middleware = require("../middleware/index");


//INDEX ROUTE
router.get("/campgrounds",function(req,res){
   
    
    //res.render("campgrounds",{campgrounds:campgrounds});
    // Retreive data from database
    CampGround.find({},function(err,allCamps){
        if(err){
            console.log("ERROR");
            console.log(err);
        }
        else{
            res.render("campgrounds",{campgrounds:allCamps , currentUser:req.user }) // to hold the data of database in the server
        }
    })
})


//Create Route
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){ // to submit new camps
var name = req.body.name;
var price = req.body.price
var image = req.body.image;
var info = req.body.info;
var author = {
    id: req.user._id,
    username: req.user.username
}
var CampObj = {name:name,image:image,info:info,author:author,price:price}; // object created to send the data to array campgrounds

//campgrounds.push(CampObj);
// push the CampObj into database

 CampGround.create(CampObj,function(err,camp){
    if(err){
        console.log("Error");
        console.log(err);
    }
    else{
        console.log(camp);
        res.redirect("/campgrounds");
    }
}) 

 
})

//New Route
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){ // A separate page for camp submission
    res.render("campgrounds/new")
})

router.get("/campgrounds/:id",function(req,res){
   //find campground by provided id
 CampGround.findById(req.params.id).populate("comments").exec(function(err, foundCamp){ // associating comments and camps
     if(err){
         console.log(err);
     }
     else{
         console.log(foundCamp);
         res.render("campgrounds/show",{campground:foundCamp});
     }
 })
 
})

//EDIT ROUTE
router.get("/campgrounds/:id/edit",function(req,res){
    // check User logged in
         if(req.isAuthenticated()){
            CampGround.findById(req.params.id,function(err,foundCamp){
                if(err){
                    res.redirect("/campgrounds");
                }
                else{
                    if(foundCamp.author.id.equals(req.user._id)){ //to check whether author and user are the same
                        res.render("campgrounds/edit",{campground:foundCamp});
                    }
                    else{
                        res.send("NOT ALLOWED");
                    }
                }
            })
               }
    
})
//UPDATE ROUTE
router.put("/campgrounds/:id",middleware.campOwner,function(req,res){
    CampGround.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCamp){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//DESTROY ROUTE (CAMP)
router.delete("/campgrounds/:id",middleware.campOwner,function(req,res){
    CampGround.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
})



module.exports = router;