var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/YelpCamp")
var CampSchema = new mongoose.Schema({
    name:String,
    price: String,
    image:String,
    info : String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },username: String
    },
    comments:[
       {
        type: mongoose.Schema.Types.ObjectId, // Associating comments and campgrounds
        ref:"Comment"
       } 
    ]
})

var CampGround = mongoose.model("CampGround",CampSchema);
module.exports = CampGround;