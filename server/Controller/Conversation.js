import { Socket } from "socket.io";
import Conversation from "../DB/model/Conversation.js";
import { io } from "../index.js";



export const addnewconversation=async(req,res)=>
    {
       try
       {
        const senderid=req.body.senderId;
        const reciverid=req.body.reciverId;

      

        const exist=await Conversation.findOne({members:{$all:[reciverid,senderid]}});
        if(exist)
            {
                return res.status(200).json("Conversation between two user is exist");
            }

            const newconversation= new Conversation(
               { 
                members:[senderid,reciverid]

               }
            );
           await  newconversation.save();
            return res.status(200).json("new Convesation is saved");

       }
       catch(err)
       {
        res.status(500).json(err);
       }

    }

export const getconversationdetails=async(req,res)=>
    {
        try
        {
            const senderid=req.body.senderId;
            const reciverid=req.body.reciverId;

            // console.log(senderid);
            // console.log(reciverid);


            const conversation= await Conversation.findOne({members:{$all:[senderid,reciverid]}});
            
            
            res.status(200).json(conversation);
            return;
              
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json(err);
        }
    }    