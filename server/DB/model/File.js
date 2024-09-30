import mongoose from "mongoose";

const file=mongoose.Schema(
    {
        _id:String,
        name:
        {
            type:String,
            required:true,
        },
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
        }


    },
    {
        timestamps:true
    }
)
export default mongoose.model('files',file);