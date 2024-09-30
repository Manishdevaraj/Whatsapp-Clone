
import mongoose from "mongoose";

const group=mongoose.Schema(
    {
       rootadmin:
       {
        type:String,
        required:true
       },
       type:{
        type:String,    
        default:"group"
       },
       userprofile:
       {
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP6oT_9Q7jrSB9V6BTSEo9j0p34ms_jedL1NvRynZ_CTeJ2clJDMHJtgdzk6rhKDelR5U&usqp=CAU'
       },
       username:
       {
        type:String,
        default:"Unknown Group"
       },

       admins:
       {
        type:Array
       },
       conversationid:
       {
        type:String
       },
       members:
       {
        type:Array
       },
       Access:
       {
        type:String,
        default:'all'
       }
       
    },
    {
        timestamps:true
    }
)
export default mongoose.model('group',group);