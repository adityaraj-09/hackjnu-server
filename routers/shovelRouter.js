const mongoose = require("mongoose");
const express = require("express");
const shovelrouter = express.Router();
const Shovel=require("../models/shovel")
const Dumper=require("../models/dumper")
const Annc=require("../models/announcement")
const Msg=require("../models/message")
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
shovelrouter.post("/announce",async (req,res)=>{
    try {
        const {msg,sender}=req.body
        let annc=new Annc({
            message:msg,
            sender:sender
        })

    annc=await annc.save()
    res.status(200).json(annc)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})
shovelrouter.get("/accnmt",async (req,res)=>{
    const d=await Annc.find({})
    res.status(200).json(d)
})
shovelrouter.post("/addMessage",async (req,res)=>{
    try {
        const {body,sender,type}=req.body
        let msg=new Msg({
            body:body,
            sender:sender,
            type:type
        })

    msg=await msg.save()
    res.status(200).json(msg)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})
shovelrouter.get("/messages",async (req,res)=>{
    try {
        let m=[]
       const msgs=await Msg.find({})
       for (let i = 0; i < msgs.length; i++) {
        const msg = msgs[i];

        let u;

        if (msg.type === "Dumper") {
            u = await Dumper.findById(msg.sender);
        } else {
            u = await Shovel.findById(msg.sender);
        }
        if (u) {
            let j = { ...u._doc, ...msg._doc };
            m.push(j);
        }
    }

       
    res.status(200).json(m)
    } catch (error) {
        res.status(500).json({msg:error})
    }
})
shovelrouter.get("/shovels",async (req,res)=>{
    const shovels=await Shovel.find({})
    res.status(200).json(shovels)
  })
shovelrouter.get("/shovel/:id",async (req,res)=>{
    const {id}=req.params
    let shovels=await Shovel.findById(id)
    res.status(200).json(shovels)
  })

module.exports=shovelrouter