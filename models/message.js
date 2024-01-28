const mongoose= require("mongoose");

const MsgSch=mongoose.Schema({
    body:{
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
    },
    type:{
        type:String,
        required:true
    }
})
const Msg=mongoose.model("message",MsgSch)
module.exports=Msg