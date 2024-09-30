import User from "../DB/model/User.js";
import dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config();

export const mobileauth=async(req,res)=>
{
    try
    {
        const {mobileNumber}= req.body;
        console.log('Received mobile number:', mobileNumber);

        if (!mobileNumber) {
            return res.status(400).json({ message: 'Mobile number is required' });
        }

        const user = await User.findOne({ MobileNumber: mobileNumber.toString() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid mobile number or credentials' }); 
          }
        return res.status(200).json(user);
        

    }
    catch(err)
    {
        return res.status(500).json({err:err});
    }
}


export const Update_user_name=async(req,res)=>
    {
        try
        {
            const user_id=req.body.id;
            const user_name=req.body.name;
            const user=await User.findByIdAndUpdate(user_id,{username:user_name});
            console.log('online users check',onlineUsers.get(user_id))
            io.to(onlineUsers.get(user_id)).emit('backend-refesh',"profile refresher...")
             
            return res.status(200).json("succesfully user name is changed!");

        }
        catch(err)
        {
            return res.status(500).json({err:err});
        }
    }    