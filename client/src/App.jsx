
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./Components/ProtectedRoute"
import { UsercontextProvoider } from "./Hooks/DbContext"
import TestPage from "./Pages/TestPage"
import Lobby from "./Pages/Lobby"
import Room from "./Pages/Room"
import { MobileAuthentication } from "./Services/api"
import { socket } from "./Services/socket"
import { useEffect } from "react"
import { UsedbContext } from "./Hooks/UsedbContext"



function App() {
 
  const {user,setcurrentuser}=UsedbContext();
   

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
  return (
    <>
     
    
         <Routes>
           <Route path="/" element={<ProtectedRoute/>}/>
           <Route path="/test" element={<TestPage/>}/>
           <Route path="/lob" element={<Lobby />} />
        <Route path="/room/:roomid" element={<Room />} />
         </Routes>
          
    </>
  )
}

export default App
