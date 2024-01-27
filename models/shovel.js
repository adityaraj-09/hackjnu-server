
const mongoose= require("mongoose");

const shovel_sch=mongoose.Schema({
    location:{
        type:Array,
        default:[]
    },
    status:{
        type:Array,             
        default:[0,0]
    },
    capacity:{
        type:Number,
        default:3000
    },
    dumperConn:{
        type:Array,
        default:[]
    },
    owner:{
        type:Array,
        default:[]
    },
    listConn:{
        type:Array,
        default:[]
    }

})

const Shovel=mongoose.model("shovel",shovel_sch)
module.exports=Shovel