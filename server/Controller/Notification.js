import Connect_new from "../DB/model/Connect_new.js";
import { io } from "../index.js";



export const request_to_conect=async(req,res)=>
    {
        try
        {
           const newrequest=new Connect_new(req.body);
           await newrequest.save();
           io.to(onlineUsers.get(req.body.reciverId)).emit('notification-recive',newrequest);
        //    io.to(onlineUsers.get(msg.senderId)).emit('msg-recive', msg);
           console.log("from serve io:",onlineUsers.get(req.body.senderId));
           res.status(200).json("Requset has been sended");
        }
        catch(err)
        {
            return res.status(500).json(err);
        }
    }

export const get_all_request=async(req,res)=>
    {
        try
        { 
            const allreq=await Connect_new.find({});
            res.status(200).json(allreq);
        }
        catch(err)
        {
            return res.status(500).json(err);
        }
    } 

export const update_request =async(req,res)=>
    {
        try
        {  
            const {id}=req.body;
            await Connect_new.findByIdAndUpdate(id,{Status:"Connected"});
            res.status(200).json("requset is updated");
        }
        catch(err)
        {
            return res.status(500).json(err);
        }
    }   
