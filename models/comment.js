var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/YelpCamp")

var commentSchema = mongoose.Schema({
    title:String,
    author: {                                           //To have a comment associated with an user
        id:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }, username: String
        
    }
    
})

module.exports = mongoose.model("Comment",commentSchema);
