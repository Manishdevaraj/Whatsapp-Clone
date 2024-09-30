import Conversation from "../DB/model/Conversation.js";
import GroupModel from "../DB/model/GroupModel.js";
import User from "../DB/model/User.js";


export const CreateGroup=async(req,res)=>
{
    const {members,rootadmin,groupname}=req.body;
    console.log("g-00",groupname);
    try
    {
        const newconversation= new Conversation(
            { 
             members:members
            })    
            // console.log(newconversation._id);
            await  newconversation.save();
            
            const groupdata={conversationid:newconversation._id,rootadmin,members,username:groupname}
            const newGroup =  new GroupModel(groupdata);
            await newGroup.save();
            const GroupPromises=members.map(async(userid)=>
            {
                     const user=await User.findByIdAndUpdate(userid,{$push:{Groups:newGroup._id}});
                     return user
            })
            await Promise.all(GroupPromises);

            res.status(200).json("group is created");

    }
    catch(err)
    {
        // console.log(err);
         return res.status(500).json({err:err});
    }
}

export const Get_group=async(req,res)=>
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
                      const Groups=user.Groups;
                      console.log(Groups);

                      const contactDetails = await GroupModel.find({ _id: { $in: Groups } });
 
                      return res.status(200).json(contactDetails);
                   }

                   return res.status(404).json("Source not found")
       }
       catch(err)
       {
          return res.status(500).json(err);
       }
    }
export const Get_group_conversionid=async(req,res)=>
    {
       try
       {
             const {id}=req.body;
             if(!id)
                {
                   return res.status(404).json("id Source not found")
                }
                const conversation= await Conversation.findOne({ _id:id});
                if(conversation)
                   {       
                       return res.status(200).json(conversation);
                    }
                   return res.status(404).json(" c Source not found")
       }
       catch(err)
       {
          return res.status(500).json(err);
       }
    }

