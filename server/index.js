const express =require("express");
const app =express();
const http = require ("http")
// const io=require("socket.io")
const cors = require("cors")
const {Server}= require("socket.io");
// const { log } = require("console");

app.use(cors());


const server =http.createServer(app);

const io =new Server(server , {
    cors: {
        origin: "http://localhost:5173",
        methods :["GET","POST"]
        
        
    },});
// exports.io = io;
io.on("connection", (socket) => {
    console.log(`user is connected :${socket.id}`);
    socket.on("send-message" , (mesage)=>{
        // console.log(message);
        io.emit("received-message", mesage); 
    });

    socket.on("disconnect", () => {
        console.log("user is Disconnected");
    });
});


server.listen(5000,()=>
console.log("server is running @   port 5000"));

//  io.on ("connection",(socket) =>{
// 
// console.log(`user connected :${socket.id}`;
// socket.on("disconnect",()=>
// console.log("disconnected");)
// })