import mongoose from "mongoose";


const request=mongoose.Schema(
    {
        senderId:
        {
            type:String,
            required:true
        },
        reciverId:
        {
            type:String,
            required:true
        },
        Status:
        {
          type:String,
          default:"pending"
        }

    },
    {
        timestamps:true
    }
)

export default mongoose.model('request',request);