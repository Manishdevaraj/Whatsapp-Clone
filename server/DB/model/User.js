import mongoose from "mongoose"
const userschema= mongoose.Schema(
   {
      username:
      {
        type:String,
        required:true
      },
      userprofile:
      {
        type:String
      },
      DOB:
      {
        type:String
      },
      MobileNumber:
      {
        type:String,
        unique: true,
      },
      msg:
      [
         {
          id:
          {
            type:String
          },
          count:
          {
            type:Number,
            default:0
          }

         }
      ],
      Contacts:
      {
        type:Array
      },
      Groups:
      {
        type:Array      
      },
      Activetime:
      {
        type:String
      },
      new_Status:
      {
        type:Array,
      },
      Statusid:
      {
        type:Array,

      },
      
      viewed_Status:
        {
            type:Array
        }

   }
);

export default mongoose.model('users',userschema);