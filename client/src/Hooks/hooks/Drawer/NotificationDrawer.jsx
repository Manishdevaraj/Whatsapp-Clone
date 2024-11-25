import { Avatar, Box, Button, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Contact_add, Get_All_Request, Get_All_requested_users, setnewconversation, update_request } from "../../../Services/api";
import { UsedbContext } from "../../UsedbContext";
import { socket } from "../../../Services/socket";

function NotificationDrawer() {
     
  const [request,setrequest]=useState([]);
  const [requested_users,setrequested_users]=useState([]);
  const [loading,setloading]=useState(true);
  const [refresh,setrefresh]=useState(true);
  useEffect(()=>
    {
      const fetchrequest=async()=>
        {
             const request_id=[]
             const res=await Get_All_Request();
             setrequest(res);
             request.forEach((item)=>
              {
                if(item.reciverId===currentwhatsappuser._id)
                  {
                    request_id.push(item.senderId)
                  }

                  
        })

         
            const res2=await Get_All_requested_users({contacts:request_id});
            setrequested_users(res2);

            
              setloading(false);

              
          
      }
      fetchrequest();
  },[loading,refresh])

    
 

  useEffect(() => {
    const handlenotifyReceive = (data) => {
      console.log('Received msg from socket', data);
      setloading(!loading);
      setrefresh(!refresh);
    };
  
    socket.on('notification-recive', handlenotifyReceive);
  
    // Cleanup function to remove the event listener
    return () => {
      socket.off('notification-recive', handlenotifyReceive);
    };
  }, [loading,refresh]);  
  
     const{currentwhatsappuser}=UsedbContext();
  // console.log("req_id",request_id);
  const accepthandeler=async(item)=>
    {
         const req_id=request.find(req=>req.senderId==item._id);
         await update_request({id:req_id._id});
         await setnewconversation({senderId:currentwhatsappuser._id,reciverId:item._id});
         await Contact_add({userid:currentwhatsappuser._id,contactid:item._id});
         await Contact_add({userid:item._id,contactid:currentwhatsappuser._id});
    }
  // console.log(requested_users.length);
  return (
    <>
           <div className="w-full mt-10 md:w-4/12">

           <Text fontSize={'xx-large'} fontWeight={'bold'}>Notifications</Text> 
             
             <Box className="flex flex-col gap-2 w-full mt-5 overflow-y-auto no-scrollbar">
             {requested_users.length?requested_users.map((item,index)=>
             {
              const reqch=request.find(req=>req.senderId===item._id);
              const isconnected=reqch.Status=="Connected";
              if(isconnected)
                {
                  requested_users.pop(item);
                }

              return(
                (
                  <Box key={index} className="flex gap-4 flex-shrink w-full  items-center text-gray-600  hover:bg-customwhite "
                 
                  >
                       <Avatar name={item.username} src={item.userprofile } size={'lg'}/>
                       <Box>
                           <Text>{item.username}</Text>
                           <Text>test</Text>
                       </Box> 
                       <Box ml={'auto'}>
                         <Button colorScheme="teal" onClick={()=>accepthandeler(item)}>accept</Button>
                      </Box>   
                              
                  </Box>
                 )
              )
             }):
             <div className="flex justify-center items-center mt-40">
                <Text>NO Notification Yet!</Text>
            </div>}
         </Box>
             
             

            
           </div>
    </>
  )
}

export default NotificationDrawer