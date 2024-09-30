import express from 'express';
import { connection } from './DB/db.js';
import route from './Routes/route.js';
import cors from 'cors';
import {Server} from "socket.io"
import User from './DB/model/User.js';
import mongoose from 'mongoose';
// import methodOverride from 'method-override'
const app=express();

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true,limit: '50mb'  }));

// app.use(methodOverride('_method'));

app.use('/',route);

connection();

const PORT=process.env.PORT||5000;

const server=app.listen(PORT,'0.0.0.0',()=>console.log(`Server is running on Port ${PORT}`))




// Socket.IO implementation for real-time communication

export const io = new Server(server, {
  cors: {
    origin: ['*'], 
    methods: ['GET', 'POST'], 
  },
});
  

// user id to socket id
global.onlineUsers = new Map();
// socket id to user id
global.socketIdTouseridMap=new Map();

global.emailToSocketIdMap=new Map();
global.socketIdToEmailMap=new Map();



io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  //  ----------------seting ----------user -----------online
  socket.on('user_online', async (userId) => {
    try {
      await User.findByIdAndUpdate(userId, {  Activetime: 'online' });
      onlineUsers.set(userId, socket.id); // Store userId as key and socketId as value
      socketIdTouseridMap.set(socket.id,userId);
      console.log(onlineUsers.get(userId));
    } catch (error) {
      console.error(`Failed to update status for user ${userId}:`, error);
    }


  });
// -----------------------------seting user offline---------------
  socket.on('disconnect', async () => {
    for (const [userId, socketId] of onlineUsers) {
      if (socketId === socket.id) {
        try {
          const timestamp = new Date();
          await User.findByIdAndUpdate(userId, { Activetime: timestamp });
          console.log(`User ${userId} is now offline`);
        } catch (error) {
          console.error(`Failed to update status for user ${userId}:`, error);
        }
        onlineUsers.delete(userId); // Remove the user from the map
      }
    }
    console.log('Client disconnected', socket.id);
  });

// Send message
socket.on('send-msg', (data) => {
  const receiverSocketId = onlineUsers.get(data.reciverId);
  console.log("kll",data.reciverId)
  console.log("klkll",receiverSocketId);
  if (receiverSocketId) {
    // console.log("intioates");
    socket.to(receiverSocketId).emit('msg-recive', data);
  }
}); 

// calling functionalities

socket.on("Voice-CallUser",(data)=>
{
  const {userid}=data;
  const receiverSocketId = onlineUsers.get(userid);
  // console.log(data.offer);
  if(receiverSocketId)
    {
      console.log("user is online.....")
      socket.to(receiverSocketId).emit('Voice-incoming-call',data);
    }
  else
   {
    io.to(socket.id).emit("User-Offline",{data:"user is offline..."});
   }  
})

socket.on("Outgoing-Call-declined",(data)=>
{
  const {id,msg}=data;
  const receiverSocketId = onlineUsers.get(id);
  console.log(receiverSocketId,"call is declined")

  socket.to(receiverSocketId).emit("incomeing-Call-declined",{data:"call is ende by user..."})
 
})

socket.on("reciver-Call-decline",(data)=>
{
  const {id}=data;
  const receiverSocketId = onlineUsers.get(id);
  console.log(receiverSocketId,"call is declined")
  
  socket.to(receiverSocketId).emit("Outgoing-Call-declined-msguser",{data:"call is ende by msg user..."})
})

socket.on("Answer-Sender-Call",(data)=>
{
     const {id}=data;
     console.log(data.ans);
   const receiverSocketId = onlineUsers.get(id);
  console.log(receiverSocketId,"call is Acepted");
  socket.to(receiverSocketId).emit("Call-Accepted",{data:"call is accepted...",ans:data.ans});

})
// ---------------------peer----webrtc-------sockets
socket.on("room:join",(data)=>
  {
      const {email,room}=data;
      emailToSocketIdMap.set(email,socket.id);
      socketIdToEmailMap.set(socket.id,email);
      console.log(data);
      io.to(room).emit('user:joined',{email,id:socket.id});

      socket.join(room);
      io.to(socket.id).emit('room:join',data);

  }
 )


 socket.on('user:call',(data)=>
{
  const {to,offer}=data;
  console.log("call user",to);
  const receiverSocketId = onlineUsers.get(to);
  io.to(receiverSocketId).emit('incomming:call',data);
})

socket.on('call:accepted',({to,ans})=>
{ 
  console.log("call accepted",to);
  const receiverSocketId = onlineUsers.get(to);

  io.to(receiverSocketId).emit('call:accepted',{from:socket.id,ans});
})
 
socket.on("peer:nego:needed",({to,offer})=>
{
  const receiverSocketId = onlineUsers.get(to);
  console.log('nego',to);

  io.to(receiverSocketId).emit('peer:nego:needed',{from:socket.id,offer});

})
socket.on("peer:nego:done",({to,ans})=>
{
  // const receiverSocketId = onlineUsers.get(to);

  io.to(to).emit('peer:nego:final',{from:socket.id,ans});
  
})

socket.on('call:declined',(data)=>
{
  const receiverSocketId = onlineUsers.get(data.to);

  console.log("call declined",data);
  socket.to(receiverSocketId).emit('call:declined',data);
})


socket.on('send:me:stream',(data)=>
{
  console.log(data.to);
  socket.to(data.to).emit('send:me:stream',data);
})
  

})




// Start the Change Stream
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connection error:', err);
});

db.once('open', async () => {
  console.log('listener is Connected to MongoDB');

  const collection = db.collection('messages');

  if (!collection) {
    console.error("Collection 'Message' does not exist");
    return;
  }

  try {
    const changeStream = collection.watch();

    if (!changeStream) {
      console.error('Change stream could not be created');
      return;
    }

    changeStream.on('change', async(change) => {
      console.log('Change detected:', change);

      switch (change.operationType) {
        case 'insert':
          console.log('New document inserted:', change.fullDocument);
          const receiverId = change.fullDocument.reciverId;
          const senderId = change.fullDocument.senderId;
           // Update the receiver's document
           await User.updateOne(
            { _id: receiverId, "msg.id": senderId },
            { $inc: { "msg.$.count": 1 } } // Increment count by 1 if senderId exists
        );

        // If senderId does not exist, add it to the array
        await User.updateOne(
            { _id: receiverId, "msg.id": { $ne: senderId } },
            { $push: { msg: { id: senderId, count: 1 } } } // Push new senderId with count 1
        );  

          io.to(onlineUsers.get(change.fullDocument. reciverId)).emit('new-message',{id:change.fullDocument.senderId});
          break;
        // case 'update':
        //   console.log('Document updated:', change.documentKey);
        //   break;
        // case 'delete':
        //   console.log('Document deleted:', change.documentKey);
        //   break;
        // default:
        //   console.log('Unknown operation:', change.operationType);
      }
    });

  } catch (error) {
    console.error('Error watching collection:', error);
  }
});

