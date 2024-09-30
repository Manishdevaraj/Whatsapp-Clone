import User from "../DB/model/User.js"
import { io } from "../index.js";

export const adduser=async(req,res)=>
    {
         try
         {
            console.log(req.body);  
            const newuser= new User(req.body);
            await newuser.save();
            console.log(newuser);
            return res.status(200).json({msg:"User is Created Successfully!"})
         }
         catch(err)
         {
            console.log(err);  
            return res.status(500).json({msg:err})  
         }
    }

export const Contact_new_user=async(req,res)=>
   {
          try
          {
            
             const user= await User.find({});
             return res.status(200).json(user);

          }
          catch(err)
          {
            console.log(err);
             return res.status(500).json({msg:err}) 
          }
   }    

export const Contact_old_user=async(req,res)=>
   {
      try
      {
            const {userno}=req.body;
            if(!userno)
               {
                  return res.status(404).json("Source not found")
               }
               const user= await User.findOne({ MobileNumber:userno});
               if(user)
                  {
                     // console.log(user.Contacts)
                     const contacts=user.Contacts;
                     // console.log(contacts);
                     const contactDetails = await User.find({ _id: { $in: contacts } });

                     return res.status(200).json(contactDetails);
                  }
                  return res.status(404).json("Source not found")


      }
      catch(err)
      {
         return res.status(500).json(err);
      }
   }
export async function add_new_contact(req,res)
{
     try
     {
      const { userid, contactid } = req.body;
      
    

      if (!userid || !contactid) {
        return res.status(400).json("Missing userid or contactid");
      }
  
      const user = await User.findByIdAndUpdate(
        userid,
        { $push: { Contacts: contactid } },
        { new: true } // This option returns the updated document
      );
  
      if (!user) {
        return res.status(404).json("User not found");
      }
      io.to(onlineUsers.get(userid)).emit('user-added-chat',user);
      io.to(onlineUsers.get(contactid)).emit('user-added-chat',user);
      return res.status(200).json(user)
     }
     catch(err)
     {
      return res.status(500).json(err);
     }
}

export const requested_users=async(req,res)=>
   {
      try
      {
         const {contacts}=req.body;
         const contactDetails = await User.find({ _id: { $in: contacts } });
          
         return res.status(200).json(contactDetails);
      }
      catch(err)
      {
         return res.status(500).json(err);
      }
   }


   export const updateProfile=async(req,res)=>
   {
      try
      {
         const {downloadURL,userid} =req.body;
         
         console.log("helloe")
         const user=await User.findByIdAndUpdate(userid,{
            userprofile:downloadURL});
            
            
         io.to(onlineUsers.get(userid)).emit('backend-refesh',"profile refresher...")
         return res.status(200).json("succesfully user profile is changed!");



      }
      catch(err)
      {
         return res.status(500).json(err);
      }
   }

   