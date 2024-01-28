const mongoose= require("mongoose");

const annSch=mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    timeStamp:{
        type:Number,
        default:Date.now()
    },
    sender:{
        type:String,
        required:true
    }
})
const Annc=mongoose.model("announcement",annSch)
module.exports=Annc
