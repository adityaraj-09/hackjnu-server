const mongoose= require("mongoose");

const dumper_sch=mongoose.Schema({
    location:{
        type:Array,
        default:[]
    },
    status:{
        type:Number,
        default:0
    },
    shovelConn:{
        type:String,
        default:""
    },
    filled:{
        type:Number,
        default:0
    },
    venue:{
        type:Array,
        default:[]
    },
    dumpingSite:{
        type:Array,
        default:[]
    },
    owner:{
        type:Array,
        default:[]
    },
    
    pos:{
        type:Array,
        default:[]
    }
    
})

const Dumper=mongoose.model("dumper",dumper_sch)
module.exports=Dumper