import mongoose from "mongoose";


const conversation=mongoose.Schema(
    {
        members:
        {
            type:Array
        },
        message:
        {
            type:String
        }

    },
    {
        timestamps:true
    }
)

export default mongoose.model('Conversation',conversation);