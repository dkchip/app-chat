import express,{Request,Response} from "express"
import cors from "cors";
import bodyParser from "body-parser"
import http from "http";
import {Server} from "socket.io";
require("dotenv").config();

import router from "./routes";
import connectDB from "./configs/connectDB";

const app = express()
const server = http.createServer(app);
const port = 8080
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});


app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }));

// Connect DB
connectDB();

// set routers 
app.use("/",router)


io.of("/chat").on("connection",async (socket) => {
    // console.log("a user connect to chat room")
    socket.on("join-group", ({userId,userId2}) => {
        const roomId = Number(userId.replaceAll(/[a-z]|[^\w\s]/gi, "")) + Number(userId2.replaceAll(/[a-z]|[^\w\s]/gi, ""));
        socket.join(roomId.toString())
        socket.emit('joined-group',roomId);

    })

    socket.on('send-msg',({currentRoom,payload}) => { 
        if(currentRoom !== ""){
            currentRoom = currentRoom.toString();
            socket.to(currentRoom).emit('reviced-msg',payload)
        }
    });
    
    socket.on('leave-group', (roomId) => {
        if(roomId){
            socket.leave(roomId);
            console.log("leave room " + roomId)
        }
    })
})



app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!') 
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

