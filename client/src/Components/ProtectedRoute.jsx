
import { useEffect } from "react";
import { UsedbContext } from "../Hooks/UsedbContext";
import LoginPage from "../Pages/LoginPage";
import MainPage from "../Pages/MainPage"
import { socket } from "../Services/socket";
import { MobileAuthentication } from "../Services/api";
function ProtectedRoute() {
  
   const {user,currentwhatsappuser,setcurrentuser}=UsedbContext();
   

   useEffect(()=>
   {
      const getuser=async()=>
      {
         if(user)
            {
                   const user2=await MobileAuthentication(user.phoneNumber);
                    setcurrentuser(user2);
                    socket.emit('user_online',user2?._id);
            }
      }
      getuser();
      return ()=>
      {
         socket.off('user_online');
      }
   },[user])
   const userauth=user;
  
   return (userauth&&currentwhatsappuser)?(<MainPage/>):<LoginPage/>

}

export default ProtectedRoute

