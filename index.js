
const express=require('express');
const {Socket}=require("dgram");
const http=require("http")
const mongoose=require("mongoose")
const shovelRouter=require("./routers/shovelRouter")
const dumperRouter=require("./routers/dumperRouter")

const app=express();

const DB="mongodb+srv://aditya:adi123@cluster0.pxaqtot.mongodb.net/?retryWrites=true&w=majority"
const port= 3001;
mongoose.connect(DB).then(async()=>{
    console.log("connected to mongodb")
}).catch((e) => {
    console.log(e);
});
var server=http.createServer(app);
const {Server}=require("socket.io")
const io=new Server(server,{ 
      cors: {
        origin: true,
      },
      allowEIO3: true,})
const cors=require("cors")
app.use(cors())
app.use(express.json())
app.use(shovelRouter)
app.use(dumperRouter)


app.use(express.json());
app.use(express.urlencoded({extended:true}));
io.on("connection",(Socket)=>{
    console.log(Socket.id)
    Socket.on("location",async ({userId,latitude,longitude,reached,dist,time})=>{
        try {
            console.log({userId,latitude,longitude})
            io.emit("location_web",{userId,latitude,longitude,reached,dist,time})
         } catch (error) {
            console.log(error)
        }
    })
    Socket.on("loading",async ({filled})=>{
        try {
            io.emit("fromhardware",{filled});
        } catch (error) {
            console.log(error)
        }
    })
})

server.listen(port,"0.0.0.0",()=>{
    console.log("running on port "+port)
})