import mongoose from "mongoose";

const status=mongoose.Schema(
    {
        _id:String,
       
        Firebaseid:
        {
            type:String,
            required:true,
            
        },
        url:
        {
            type:String,
            required:true,
            unique: true,
        },
        type:
        {
            type:String,
            required:true,
        },


    },
    {
        timestamps:true
    }
)
export default mongoose.model('status',status);