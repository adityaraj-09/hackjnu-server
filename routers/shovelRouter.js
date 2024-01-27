const mongoose = require("mongoose");
const express = require("express");
const shovelrouter = express.Router();
const Shovel=require("../models/shovel")
shovelrouter.get("/", async(req,res)=>{

    res.send("Hii shovel connected")
})

shovelrouter.post("/addShovel",async (req,res)=>{
    try {
        const {loc,dri}=req.body
        let shovel=new Shovel({
            location:loc,
            owner:dri
        })
        shovel= await shovel.save()
        res.status(200).json(shovel)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})
shovelrouter.get("/shovels",async (req,res)=>{
    const shovels=await Shovel.find({})
    res.status(200).json(shovels)
  })
shovelrouter.get("/shovel/:id",async (req,res)=>{
    const {id}=req.params
    const shovels=await Shovel.findById(id)
    res.status(200).json(shovels)
  })
module.exports=shovelrouter