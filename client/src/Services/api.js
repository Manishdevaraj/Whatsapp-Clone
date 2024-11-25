
import axios from 'axios'
const url="http://localhost:5000"
// const url="https://whatsapp-clone-server-5fko.onrender.com"
// const url="http://192.168.43.51:5000"





export const CreatenewUser=async(data)=>
{
    try
        {
           
                const user= await axios.post(`${url}/adduser`,data);
                console.log(user);
                // return user.data;
           
        }
        catch(err)
        {
            console.log("Error while requseting current number",err);
            throw err;
        }
}

export const MobileAuthentication=async(number)=>
{
    try
        {
           if(number)
            {
                const authentication= await axios.post(`${url}/mobileauthentication`,{mobileNumber:number},);
                return authentication.data;
            }
            else
            {
                // console.log("error in number:",number)
            }
        }
        catch(err)
        {
            // console.log("Error while requseting current number",err)
        }
}



export const Contact_new_User=async()=>
    {
        try
        {
            const users= await axios.get(`${url}/contact/new/users`);
            console.log("users",users);
            return users.data;
        }
        catch(err)
        {
            // console.log("Error while requseting conversation",err)
        }
    }
export const Contacted_Users=async(data)=>
    {
        try
        {
            const users= await axios.post(`${url}/contact/old/users`,data);
            console.log("users",users);
            return users.data;
        }
        catch(err)
        {
            // console.log("Error while requseting conversation",err)
        }
    }
export const Contact_add=async(data)=>
    {
        try
        {
            const users= await axios.post(`${url}/contact/add/new/contact`,data);
            // console.log("users",users);
            return users.data;
        }
        catch(err)
        {
            // console.log("Error while requseting conversation",err)
        }
    }


export const setnewconversation=async(data)=>
        {
            try
            {
                  const conversation_response=await axios.post(`${url}/new/conversation`,data);
                //   console.log(conversation_response);
            }
            catch(err)
            {
            //    console.log("conversation error :",err);
            }
        }

export const getconversationdetails=async(data)=>
    {
        try
        {
            const conversation=await axios.post(`${url}/get/conversationdetails`,data);
            // console.log(conversation);
            return conversation;
        }
        catch(err)
        {
            // console.log("error from geting conversation id:",err);
        }
    }
export const addnewmessage=async(data)=>
            {
                try
            {
                  const message_response=await axios.post(`${url}/new/message`,data);
                //   console.log("jhhbkj",message_response);
            }
            catch(err)
            {
            //    console.log("conversation  add new message error :",err);
            }
            }
export const getallmessage=async(data)=>
            {
                try
            {
                  const message_response=await axios.post(`${url}/get/allmessages`,data);
                //   console.log(message_response);
                  return message_response;
            }
            catch(err)
            {
            //    console.log("conversation  add new message error :",err);
            }
            }
export const uploadFile=async(data)=>
    {
        try
        {
                const res=await axios.post(`${url}/chat/pdf/upload`,data);
                // console.log("from file uplod api:",res);
                return res;
        }
        catch(err)
        {
            // console.log("error from file uplod api:",err)
        }
    }
    
    export const getfileurl=async(data)=>
        {
            
            try
            {
                const res=await axios.post(`${url}/chat/pdf/download`,data);
                // console.log("from file uplod api:",res);
                return res;
            }
            catch(err)
            {
                // console.log("error from file geting file url api:",err)
            }
        }   
export const uploadphotos=async(data)=>
            {
                try
                {
                        const res=await axios.post(`${url}/chat/photos/upload`,data);
                        // console.log("from img uplod api:",res);
                        return res;
                }
                catch(err)
                {
                    // console.log("error from img uplod api:",err)
                }
            }
            
            export const getimgeurl=async(data)=>
                {
                    
                    try
                    {
                        const res=await axios.post(`${url}/chat/photos/download`,data);
                        // console.log("from file uplod api:",res);
                        return res;
                    }
                    catch(err)
                    {
                        // console.log("error from file geting file url api:",err)
                    }
                } 
export const uploadaudio=async(data)=>
        {
            try
            {
            const res=await axios.post(`${url}/chat/audio/upload`,data);
            // console.log("from audio uplod api:",res);
            return res;
            }
            catch(err)
            {
            // console.log("error from audio uplod api:",err)
            }
        }
export const uploadvideo=async(data)=>
        {
            try
            {
            const res=await axios.post(`${url}/chat/video/upload`,data);
            // console.log("from audio uplod api:",res);
            return res;
            }
            catch(err)
            {
            // console.log("error from audio uplod api:",err)
            }
        }


export const Request_new_user_to_connect=async(data)=>
    {
       
        try
            {
            const res=await axios.post(`${url}/request/new/user`,data);
            // console.log("from Request_new_user_to_connect api:",res);
            return res;
            }
            catch(err)
            {
            // console.log("error from Request_new_user_to_connect api:",err)
            }

    }  
    
export const Get_All_Request=async()=>
    {
        
          try
            {
            const res=await axios.post(`${url}/request/get/all`);
            // console.log("from  Get_All_Request api:",res);
            return res.data;
            }
            catch(err)
            {
            // console.log("error from Get_All_Request api:",err)
            } 

    }    
export const Get_All_requested_users=async(data)=>
    {
        
          try
            {
            const res=await axios.post(`${url}/request/get/notification`,data);
            // console.log("from Get_All_requested_users api:",res);
            return res.data;
            }
            catch(err)
            {
            // console.log("error from Get_All_requested_users api:",err)
            } 

    }   
    
export const update_request=async(data)=>
    {
        try
            {
            const res=await axios.post(`${url}/request/update/status`,data);
            // console.log("from Get_All_requested_users api:",res);
            }
            catch(err)
            {
            // console.log("error from Get_All_requested_users api:",err)
            } 
    }    

    export const generatezegotoken=async(data)=>
        {
            try
            {
            const res=await axios.post(`${url}/generate/zego/token`,data);
            // console.log("from token zego gerator:",res);
            return res.data;
            }
            catch(err)
            {
            // console.log("error from zego gerator api:",err)
            } 

        }
export const Updateusername=async(data)=>
        {
            try
            {
            const res=await axios.post(`${url}/user/update/name`,data);
            // console.log("from token update username:",res);
            }
            catch(err)
            {
            // console.log("from token update username api:",err)
            } 

        }

export const  upload_Status =async(data)=>
{
    try
            {
            const res=await axios.post(`${url}/add/new/status`,data);
            // console.log("from token update status:",res);
            }
            catch(err)
            {
            // console.log("from token update status api:",err)
            } 

}

export const get_details_status =async(data)=>
{
    try
    {
    const res=await axios.post(`${url}/get/status/details`,data);
    // console.log("from  get_details_status:",res);
    return res.data;
    }
    catch(err)
    {
    // console.log("from  get_details_status:",err)
    }
  
}
export const update_status_view =async(data)=>
{
    try
    {
    const res=await axios.post(`${url}/get/status/update`,data);
    // console.log("from update_status_view:",res);
    return res.data;
    }
    catch(err)
    {
    // console.log("from  update_status_view:",err)
    }
  
}
export const Get_My_Status =async(data)=>
{
    try
    {
    const res=await axios.post(`${url}/get/my/status`,data);
    // console.log("from Get_My_Status:",res);
    return res.data;
    }
    catch(err)
    {
    // console.log("from  Get_My_Status:",err)
    }
  
}
export const Delete_My_status =async(data)=>
{
    try
    {
    const res=await axios.post(`${url}/delete/my/status`,data);
    // console.log("from Delete_My_status:",res);
    return res.data;
    }
    catch(err)
    {
    // console.log("from  Delete_My_status:",err)
    }
  
}
export const Create_Group =async(data)=>
{
    try
    {
    const res=await axios.post(`${url}/create/group`,data);
    // console.log("from Create_Group:",res);
    }
    catch(err)
    {
    // console.log("from  Create_Group:",err)
    }
  
}
export const Get_Group =async(data)=>
{
    try
    {
    const res=await axios.post(`${url}/get/group`,data);
    // console.log("from get_Group:",res);
    return res.data;
    }
    catch(err)
    {
    // console.log("from  get_Group:",err)
    }
  
}
export const Get_Group_conversationid =async(data)=>
{
    try
    {
    const res=await axios.post(`${url}/get/group/conversationid`,data);
    // console.log("from Get_Group_conversationid:",res);
    return res.data;
    }
    catch(err)
    {
    // console.log("from  Get_Group_conversationid:",err)
    }
  
}
export const updateProfile=async(data)=>
{
    try
    {
    const res=await axios.post(`${url}/user/update/profile`,data);
    // // console.log("from Get_Group_conversationid:",res);
    // return res.data;
    console.log(data);
    }
    catch(err)
    {
    // console.log("from  Get_Group_conversationid:",err)
    }
  
}

export const ClearNotifier=async(data)=>
{
    try
    {
      await axios.post(`${url}/clear/notifier`,data);
   
    }
    catch(err)
    {
    // console.log("from  Get_Group_conversationid:",err)
    }
  
}