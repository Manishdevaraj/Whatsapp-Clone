import Message from "../DB/model/Message.js";
import conversation from "../DB/model/Conversation.js";
import { io } from "../index.js";
import User from "../DB/model/User.js";


export const message=async(req,res)=>
    {
        try
        {
            const newmsg= new Message(req.body);
            await newmsg.save();
           const conversationid=req.body.conversationId;
           console.log(req.body.reciverId);
           await conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.message})
           const user=await User.findById(req.body.senderId);
           await User.findByIdAndUpdate(req.body.reciverId,{unseen})
           return res.status(200).json('message is send succesfully');
        }
        catch(err)
        {
            return res.status(500).json(err);
        }
    }

   
export const getallmsg=async(req,res)=>
    {
        if(!req.body.senderid)
            {
               return res.status(404).json("id is not defined");
            }
       try
       {
            //  console.log(req.body.conversationId);
             const messages=await Message.find({conversationId:req.body.conversationId});
             const unreadmsg=[]
                        messages.forEach((msg,index)=>
                        {
                            
                            if(msg.Status!='read'&&msg.senderId!=req.body.senderid)
                                {
                                    io.to(onlineUsers.get(msg.senderId)).emit('msg-recive', msg);
                                console.log("update msg",onlineUsers.get(msg.senderId));
                                // messages[index].Status="read";
                                //  console.log(msg);
                                unreadmsg.push(msg._id);
                                // console.log(msg);

                            }
                        })
                        if (unreadmsg.length >= 0) {
                            await Message.updateMany(
                                { _id: { $in: unreadmsg } },
                                { Status: "read" }
                            );
                        }
                        // console.log(unreadmsg);
             res.status(200).json(messages);
       }
       catch(err)
       {
           return res.status(500).json(err);
       }
    }    


export  async  function update_usermsgnotifier(req,res)
{
   try
   {
        const {id,friendid}=req.body;
          // If senderId does not exist, add it to the array
          await User.updateOne(
            { _id: id },
            { $pull: { msg: { id: friendid } } } // Pull the element with id equal to friendid
        );
        res.status(200).json({ message: "Message removed successfully" });
   }
   catch(err)
   {
    return res.status(500).json(err);
   }
}
