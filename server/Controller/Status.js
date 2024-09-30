import { deleteStatusFb } from "../DB/Firebase.js";
import StatusModel from "../DB/model/StatusModel.js";
import User from "../DB/model/User.js";
import { io } from "../index.js";


export const Add_Status = async(req,res)=>
    {
         try
         {
            const statusdata={_id:req.body.id, Firebaseid:req.body.Firebaseid,url:req.body.url,type:req.body.type};

            const status =new StatusModel(statusdata);
            await status.save();

            // update curruen usr status id
            const user = await User.findByIdAndUpdate(req.body.senderId,
                { $push: { Statusid: req.body.id} },
                { new: true });

            // update to all contacts
             const current_user = await User.findOne({_id:req.body.senderId});

             const contact=current_user.Contacts;
            //  console.log(contact);
            
             contact.forEach(async(element) => 
               {
                 const current2_user = await User.findOne({_id:element});
                 if(!current2_user.new_Status.includes(req.body.senderId))
                  {
                     
                     const user = await User.findByIdAndUpdate(element,
                        { $push: { new_Status: req.body.senderId},
                          $pull: { viewed_Status: req.body.senderId},
                      },   
                        { new: true });
                     }
                     else
                     {
                       console.log("Alredy in list.....");
                     }
                     io.to(onlineUsers.get(element)).emit("status-update","hellow it is Status Update")
                  });

         io.to(onlineUsers.get(req.body.senderId)).emit('status-update');
            

            res.status(200).json("Succesfull status is added....");
         }
         catch(err)
         {
            return res.status(500).json({err:err});
         }
         
         
    }

export const get_status_details=async(req,res)=>
   {
      try
      {
         const {id}=req.body;
         const user = await User.findOne({ _id: id });
         const name = user.username;
         const profile=user.userprofile;
         const userid=user._id
         const statusids = user.Statusid;
         let time;
         const urls = [];
     
         const statusPromises = statusids.map(async (element) => {
           const file = await StatusModel.findOne({ _id: element });
           urls.push({url:file.url,type:file.type});
           time = file.updatedAt; // this will be the time of the last status in the array
           return file;
         });
     
         await Promise.all(statusPromises);
     
         return res.status(200).json({ time: time, urls: urls,name:name,profile,userid });
      }
      catch(err)
      { 
         console.log(err)
         return res.status(500).json({err:err});
      }
   }
export const update_status_view=async(req,res)=>
   {
      try
      {
               const {m_id,u_id}=req.body;
               // console.log("hellow",m_id,u_id);
               const current2_user = await User.findOne({_id:u_id});
                 if(!current2_user.viewed_Status.includes(m_id))
                  {
               const user = await User.findByIdAndUpdate(u_id,
                  { $pull: { new_Status: m_id} ,
                    $push: { viewed_Status: m_id}
                   },    
                  { new: true });
               
                  }
                  else
                  {
                     const user = await User.findByIdAndUpdate(u_id,
                        { $pull: { new_Status: m_id}},    
                        { new: true });              
                  }
               
                  io.to(onlineUsers.get(u_id)).emit('status-update');
                  
               res.status(200).json('successfully updated.......')

      }
      catch(err)
      {
         return res.status(500).json({err:err});
           
      }
   }
 
export const Get_My_Status=async(req,res)=>
   {
      try
      {
         const {id}=req.body;
         const user = await User.findOne({ _id: id });
         const statusids = user.Statusid;
         const files= [];
     
         const statusPromises = statusids.map(async (element) => {
           const file = await StatusModel.findOne({ _id: element });
           files.push(file);
           return file;
         });
     
         await Promise.all(statusPromises);
        
         res.status(200).json(files);
      }
      catch(err)
      {
         res.status(500).json({err:err});
      }
   }
export const Delete_My_status=async(req,res)=>
   {
      try
      {
         const {id,userid}=req.body;
         const status= await StatusModel.findOne({_id:id});
         const FB_path=status.Firebaseid;
         await deleteStatusFb('status/'+FB_path);
         
         await StatusModel.deleteOne({_id:id});
           await User.findByIdAndUpdate(userid,
            { $pull: { Statusid: id}},    
            { new: true });    
            
         const user = await User.findOne({ _id: userid });
         const statusids = user.Statusid;

         if(statusids.length<=0)
            {
               const contacts=user.Contacts;
               console.log("jklkkn",contacts);
               const statusPromises = contacts.map(async (element) => {
                  return await User.findByIdAndUpdate(element,
                     { $pull: { new_Status: userid,viewed_Status: userid}},    
                     { new: true }); 
                 
                });


                await Promise.all(statusPromises);
            }


         io.to(onlineUsers.get(userid)).emit('status-update');
         res.status(200).json("Successfully deleted.....")

      }
      catch(err)
      {
         console.log(err);
        return res.status(500).json({err:err});
      }
   }   

export const Get_all_Stausids=async(req,res)=>
   {
      try
      {
         const {id}=req.body;
         const ids=[];
         const user = await User.findOne({ _id: id });
         const contacts=user.Contacts;
         ids.push(user.Statusid);
         
         const statusPromises = contacts.map(async (element) => {
            const user = await User.findOne({_id:element});
               ids.push(user.Statusid);
               return user;       
          });


          await Promise.all(statusPromises);

          return res.status(200).json(ids);

      }
      catch(err)
      {
         res.status(500).json({err:err})
      }
   }  