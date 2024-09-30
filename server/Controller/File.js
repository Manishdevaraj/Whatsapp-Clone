import AudioModel from "../DB/model/AudioModel.js";
import Conversation from "../DB/model/Conversation.js";
import File from "../DB/model/File.js";
import Message from "../DB/model/Message.js";
import Video from "../DB/model/Video.js";
import image from "../DB/model/image.js";
import { io } from "../index.js";

 export const newpdf=async(req,res)=>
    {
         const { name, id, url, senderId, reciverId, conversationId }=req.body;
         
         console.log(req.body.type)
         try
         {
             if(!name || !id || !url || !senderId || !reciverId || !conversationId)
                {
                    res.status(404).json("Source not found error!");
                }
                const pdfdata={_id:req.body.id, name:req.body.name,Firebaseid:req.body.Firebaseid,url:req.body.url}
                const newpdf= new File(pdfdata);
                await newpdf.save()
                const data={ message:req.body.name,fileid:req.body.id,type:req.body.type,url:req.body.url,senderId:req.body.senderId,reciverId:req.body.reciverId,conversationId:req.body.conversationId,}
                const newmsg= new Message(data);
                await newmsg.save();
                io.to(onlineUsers.get(req.body.senderId)).emit('msg-recive',newmsg );
               const conversationid=req.body.conversationId;
               await Conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.name})

                res.status(200).json("fils is saved")

         }
         catch(err)
         {
            console.log(err);
            return res.status(500).json(err);
         }
    }

    export const getfiledownloadurl=async(req,res)=>
      {
         try
         {
            console.log("api from url");
            console.log(req.body.id)
           const url=await File.findOne({_id:req.body.id});
           return res.status(200).json(url);

         }
         catch(err)
         {
           return res.status(500).json(err);
         }
      }


      export const newimg=async(req,res)=>
         {
              const { name, id, url, senderId, reciverId, conversationId }=req.body;
              
              console.log(req.body.type)
              try
              {
                  if(!name || !id || !url || !senderId || !reciverId || !conversationId)
                     {
                         res.status(404).json("Source not found error!");
                     }
                     const pdfdata={_id:req.body.id, name:req.body.name,Firebaseid:req.body.Firebaseid,url:req.body.url}
                     const newimg= new image(pdfdata);
                     await newimg.save();
                     const data={ message:req.body.name,fileid:req.body.id,Firebaseid:req.body.id,url:req.body.url,type:req.body.type,senderId:req.body.senderId,reciverId:req.body.reciverId,conversationId:req.body.conversationId,}
                     const newmsg= new Message(data);
                     await newmsg.save();
                     io.to(onlineUsers.get(req.body.senderId)).emit('msg-recive', newmsg);
                    const conversationid=req.body.conversationId;
                    await Conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.name})
     
                     res.status(200).json("fils is saved")
     
              }
              catch(err)
              {
                 console.log(err);
                 return res.status(500).json(err);
              }
         }
     
export const getimgdownloadurl=async(req,res)=>
           {
              try
              {
                 console.log("api from url");
                 console.log(req.body.id)
                const url=await image.findOne({_id:req.body.id});
                return res.status(200).json(url);
     
              }
              catch(err)
              {
                return res.status(500).json(err);
              }
           }

export async function uploadaudio(req,res)     
{
   const { name, id, url, senderId, reciverId, conversationId }=req.body;
              
              console.log(req.body.type)
              try
              {
                  if( !id || !url || !senderId || !reciverId || !conversationId)
                     {
                         res.status(404).json("Source not found error!");
                     }
                     const audiodata={_id:req.body.id, Firebaseid:req.body.Firebaseid,url:req.body.url}
                     const newaudio= new AudioModel(audiodata);
                     await newaudio.save();

                     const data={ message:req.body.msg,fileid:req.body.id,Firebaseid:req.body.id,url:req.body.url,type:req.body.type,senderId:req.body.senderId,reciverId:req.body.reciverId,conversationId:req.body.conversationId,}
                     const newmsg= new Message(data);
                     await newmsg.save();
                     io.to(onlineUsers.get(req.body.senderId)).emit('msg-recive', newmsg);
                    const conversationid=req.body.conversationId;
                    await Conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.msg})
     
                     res.status(200).json("fils is saved")
     
              }
              catch(err)
              {
                 console.log(err);
                 return res.status(500).json(err);
              }
         }
export const getaudiodownloadurl=async(req,res)=>
   {
      try
      {
         
       
        const url=await AudioModel.findOne({_id:req.body.id});
        return res.status(200).json(url);

      }
      catch(err)
      {
        return res.status(500).json(err);
      }
   }
// --------------------video---------------------

export async function uploadvideo(req,res)     
{
   const { name, id, url, senderId, reciverId, conversationId }=req.body;
              
              console.log(req.body.type)
              try
              {
                  if( !id || !url || !senderId || !reciverId || !conversationId)
                     {
                         res.status(404).json("Source not found error!");
                     }
                     const videodata={_id:req.body.id, Firebaseid:req.body.Firebaseid,url:req.body.url}
                     const newvideo= new Video(videodata);
                     await newvideo.save();
                       
                     const data={ message:req.body.msg,fileid:req.body.id,Firebaseid:req.body.id,url:req.body.url,type:req.body.type,senderId:req.body.senderId,reciverId:req.body.reciverId,conversationId:req.body.conversationId,}
                     const newmsg= new Message(data);
                     await newmsg.save();
                     io.to(onlineUsers.get(req.body.senderId)).emit('msg-recive', newmsg);
                    const conversationid=req.body.conversationId;
                    await Conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.msg})
     
                     res.status(200).json("fils is saved")
     
              }
              catch(err)
              {
                 console.log(err);
                 return res.status(500).json(err);
              }
         }
