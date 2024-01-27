const mongoose = require("mongoose");
const express = require("express");
const dumperrouter = express.Router();
const Shovel=require("./../models/shovel")
const Dumper=require("./../models/dumper")
function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  dumperrouter.post("/addDumper",async (req,res)=>{
    try {
        const {loc,dri,dump}=req.body
        let shovel=new Dumper({
            location:loc,
            owner:dri,
            dumpingSite:dump
        })
        shovel= await shovel.save()
        res.status(200).json(shovel)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})
  dumperrouter.get("/a",async (req,res)=>{
    const d=getDistanceFromLatLonInKm(0,0,10,10)
    res.status(200).json({d})
  })
  dumperrouter.get("/dumpers",async (req,res)=>{
    const dumpers=await Dumper.find({})
    res.status(200).json(dumpers)
  })

  dumperrouter.post("/reset",async (req,res)=>{
    try {
        let {dumpId,loc}=req.body;
        let dumper= await Dumper.findById(dumpId)
        dumper.location=loc
        dumper.status=0
        dumper.filled=0;
        dumper.venue=[]
        dumper=await dumper.save()
        res.status(200).json(dumper)

        

    } catch (error) {
        res.status(500).json({msg:error.message})
    }
  })
  dumperrouter.post("/startDumping",async (req,res)=>{
    try {
        let {dumpId,loc}=req.body; 
        let dumper= await Dumper.findById(dumpId)
        dumper.shovelConn=""
        dumper.location=loc
        dumper=await dumper.save()
        res.status(200).json(dumper)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
  })
dumperrouter.post("/getShovel",async (req,res)=>{

    try {
        let {dumpId}=req.body
        let sh_id=''
        let shovel=await Shovel.find()
        let mindis=0
        let dumper= await Dumper.findById(dumpId)
        let location=dumper.location

        for (let i = 0; i < shovel.length; i++) {
            let sho = shovel[i];
            const d=getDistanceFromLatLonInKm(location[0],location[1],sho.location[0],sho.location[1])
            if(mindis===0){
                mindis=d
                sh_id=sho._id
            }
            if(d<mindis)  {
                mindis=d
                sh_id=sho._id
            }
            
            
        }
        
        let finalShovel=await Shovel.findById(sh_id)
        dumper.shovelConn=sh_id
        dumper.venue=finalShovel.location
        dumper.status=1
        finalShovel.status=[1,0]
        await dumper.save()
        
        let l=finalShovel.listConn
        if(!l.includes(sh_id)){

            l.push(sh_id)
        }
        finalShovel.listConn=l
        finalShovel=await finalShovel.save()
        res.status(200).json({...finalShovel._doc,mindis,dumperLoc:location})

    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
})
module.exports=dumperrouter