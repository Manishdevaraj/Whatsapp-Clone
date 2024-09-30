import mongoose from "mongoose";


const msg=mongoose.Schema(
    {
        message:
        {
            type:String
        },
       fileid:
        {
            type:String
        },
        Firebaseid:String,
        url:String,
        type:
        {
            type:String
        },
       
        senderId:
        {
            type:String
        },
        reciverId:
        {
            type:String
        },
        conversationId:
        {
            type:String
        },
        Status:
        {
            type:String,
            default:"send"
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model('Messages',msg);