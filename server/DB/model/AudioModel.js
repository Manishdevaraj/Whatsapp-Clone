import mongoose from "mongoose";


const audio=mongoose.Schema(
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
        }


    },
    {
        timestamps:true
    }
)

export default mongoose.model('audio',audio);