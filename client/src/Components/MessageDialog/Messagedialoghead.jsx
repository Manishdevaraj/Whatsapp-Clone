import { Avatar, Box, Text } from "@chakra-ui/react"

import { BsThreeDotsVertical } from "react-icons/bs";
import { UsedbContext } from "../../Hooks/UsedbContext";
import { FaArrowLeft } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import { socket } from "../../Services/socket";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import peer from "../../Services/peer";
function Messagedialoghead({onmdarrowclick}) {

     const {msguser,setscreenfalse_to_see_contacts,currentwhatsappuser,setisCalling,setRemoteSocketId,setcalltype,setMyStream}=UsedbContext();
    
     const CallUser=useCallback(async(type)=>
        {
                
            socket.emit("room:join",{room:currentwhatsappuser._id+msguser._id});
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video:type==='Voice'?false:true,
              });

              const offer = await peer.getoffer();
              socket.emit("user:call", { to: msguser._id, offer,userid:msguser._id,img:currentwhatsappuser.userprofile,name:currentwhatsappuser.username,callerid:currentwhatsappuser._id, type:type });
              setMyStream(stream);
          
            // socket.emit("Voice-CallUser",{});
            setisCalling(true);
            setRemoteSocketId(msguser._id);
            setcalltype(type);
        },[currentwhatsappuser._id, currentwhatsappuser.username, currentwhatsappuser.userprofile, msguser._id, msguser.id, setMyStream, setRemoteSocketId, setcalltype, setisCalling]);
     
        // const navigate=useNavigate();

        const handeljoinroom=useCallback((data)=>
            {
                  
                  console.log(data);
                //   navigate(`/room/${data.room}`);
    
            },[])
        useEffect(()=>
        {
            socket.on('room:join',handeljoinroom)
            return ()=>
                {
                    socket.off('room:join',handeljoinroom)
            
                }
        },[handeljoinroom])
        
  return (
    <>
    <Box className="flex flex-row  items-center h-20 w-full gap-6 ">
            
        <div className="flex  gap-5 items-center " >
            {/* ------------md screen arrow--- */}

            <div className="hidden c1:block" onClick={onmdarrowclick}>
                    <FaArrowLeft />
            </div>
            {/* ------------sm scren arrow--- */}
            <div className="block c1:hidden" onClick={setscreenfalse_to_see_contacts}>
                    <FaArrowLeft />
            </div>
            {msguser.userprofile?<Avatar src={msguser.userprofile}/>:<Avatar bg={"gray"}/>}
            
            <div>
                <Text>{msguser.username}</Text>
                {msguser.Activetime==="online"?<Text>online</Text>:null}
            </div>
        </div>

        <div className="flex ml-auto items-center gap-8">
            <FaPhoneAlt size={"20px"} color="gray" onClick={()=>CallUser('Voice')}/>
            <IoMdVideocam size={"20px"} color="gray" onClick={()=>CallUser('Video')} />
           
            <BsThreeDotsVertical size={"28px"} color="gray"/>
        </div>
    </Box>
    
    </>
  )
}

export default Messagedialoghead