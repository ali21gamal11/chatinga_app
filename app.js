const express = require('express');
const app = express();
require('dotenv').config();
const cors =require("cors");
const { Server } = require("socket.io");
const http = require("http");
const connect = require('./config/connect');

connect();


const user = require('./routes/userRoutes');
const message = require('./routes/messageRoutes');
const auth = require('./routes/auth');

const logger = require('./middleware/logger');

app.use(logger)
app.use(express.json());
app.use(cors());

app.use('/api/user',user)
app.use('/api/message',message);
app.use('/api/auth',auth);

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

app.set("io",io);

io.on("connection",(socket)=>{
    console.log("user connected: ",socket.id);

    socket.on("sendMessage",(data)=>{
        console.log("message received: ",data);
    });

    socket.on("disconnect:",(socket)=>{
        console.log("user disconnected",socket.id)
    })
})



const port = process.env.PORT
server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})