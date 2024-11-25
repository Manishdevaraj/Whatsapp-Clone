import { useEffect, useCallback, useState} from "react";
import ReactPlayer from "react-player";
import peer from "../Services/peer";
import { socket } from "../Services/socket";
import { Avatar, Box, Text, useToast } from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import { UsedbContext } from "../Hooks/UsedbContext";
import { IoIosMic } from "react-icons/io";
import { IoIosMicOff } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import { CiVideoOff } from "react-icons/ci";


const Room = ({incomecall,income_caller,setchat,setincoming_call}) => {
    const {setMyStream,MyStream,remoteSocketId,
        RemoteStream,setRemoteStream,calltype,msguser,setisCalling,currentwhatsappuser
    }=UsedbContext();
const [call_accept, setcall_accept] = useState(false);
const [isMuted, setIsMuted] = useState(false);
const [isVideoOff, setIsVideoOff] = useState(false);
const toast = useToast()

useEffect(()=>
{
  if(incomecall)
  {
    setcall_accept(true);
  }
},[incomecall])

const ondeclineclick = async () => {
  // Stop the local media stream if it's active
  if (MyStream) {
    MyStream.getTracks().forEach((track) => track.stop());
    setMyStream(null);
  }
  // Stop the remote media stream if it exists
  if (RemoteStream) {
    RemoteStream.getTracks().forEach((track) => track.stop());
    setRemoteStream(null);
  }

  // Close the peer connection
  // if (peer.peer) {
  //   peer.peer.close(); // Close the connection
  //   peer.peer = null; // Reset peer object (depends on how peer is structured in your app)
  // }

    if(incomecall)
    {
      socket.emit('call:declined',{to:income_caller.callerid,name:currentwhatsappuser.username});
      socket.emit("reciver-Call-decline", { id: income_caller.callerid});
    }
    else
    {
      socket.emit('call:declined',{to:msguser._id,name:currentwhatsappuser.username});
      socket.emit("Outgoing-Call-declined", { id: msguser._id, msg: "from caller" });
    }
    setisCalling(false);
    setincoming_call(false);
    setcall_accept(false);
    setchat(true);  
  setisCalling(false);
};


//   const handleUserJoined = useCallback(({ userid, id }) => {
//     console.log(`Email ${userid} joined room`);
//     setRemoteSocketId(id);
//   }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getoffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId]);

//   const handleIncommingCall = useCallback(
//     async ({ from, offer }) => {
//       setRemoteSocketId(from);
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setMyStream(stream);
//       console.log(`Incoming Call`, from, offer);
//       const ans = await peer.getanswer(offer);
//       socket.emit("call:accepted", { to: from, ans });
//       setincomecall(true);
//       sendStreams();
//     },
//     []
//   );

  const sendStreams = useCallback(() => {
    if(MyStream)
    {
      for (const track of MyStream.getTracks()) {
        peer.peer.addTrack(track, MyStream);
      }
    }
  }, [MyStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      setcall_accept(true);
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getoffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getanswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    []
  );

  const handleNegoNeedFinal = useCallback(async ({ from,ans }) => {
    await peer.setLocalDescription(ans);
    socket.emit('send:me:stream',{to:from});
  }, []);
  
  useEffect(() => {
      peer.peer.addEventListener("track", async (ev) => {
          const remoteStream = ev.streams;
          console.log("GOT TRACKS!!");
          setRemoteStream(remoteStream[0]);
        });
    }, []);
    const handlesm = useCallback(async (data) => {
      console.log("send me a stream...");
      setTimeout(() => {
        sendStreams();
      }, 2000); // 2000 milliseconds = 2 seconds
    }, [sendStreams]);
    
const handelmediadevice=async(data)=>
{
   // Stop the local media stream if it's active
   if (MyStream) {
    MyStream.getTracks().forEach((track) => track.stop());
    setMyStream(null);
  }
  // Stop the remote media stream if it exists
  if (RemoteStream) {
    RemoteStream.getTracks().forEach((track) => track.stop());
    setRemoteStream(null);
  }
  toast({
    title: 'Call Ended...',
    description: `Call is Ended by ${data.name}`,
    status: 'success',
    duration: 9000,
    position:'top-right',
    isClosable: true,
  })
  setisCalling(false);
    setincoming_call(false);
    setcall_accept(false);
    setchat(true);  
  setisCalling(false);

  
}
  useEffect(() => {
    socket.on('call:accepted',handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("send:me:stream", handlesm);
    socket.on("call:declined",handelmediadevice);

    
    return () => {
        socket.off("send:me:stream", handlesm);
    socket.off("call:declined",handelmediadevice);

    //   socket.off("user:joined", handleUserJoined);
    //   socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal, handlesm]);
 
  console.log(calltype);
  console.log(income_caller);
//  ----------------------------muting -futures
 // Mute/Unmute Audio
 const toggleMute = () => {
  if (MyStream) {
    MyStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted(!isMuted);
  }
};

// Enable/Disable Video
const toggleVideo = () => {
  if (MyStream) {
    MyStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoOff(!isVideoOff);
  }
};
  return (
    <>
      {/* <h1>Room Page</h1> */}
      {/* <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4> */}
      {/* {MyStream && <button onClick={sendStreams}>Send Stream</button>} */}
      {/* {remoteSocketId && <button onClick={handleCallUser}>CALL</button>} */}
        
      {calltype==='Voice'?
     
     <Box className="flex justify-center w-full ">
         <Box display={'block'}>
           <ReactPlayer
                   playing
                  //  muted 
                   width={100}    
                   url={RemoteStream} 
                 /> 
         </Box>
     {incomecall ? (
       // Incoming call
       <Box className=" text-green-500  w-full ">
         <Box className="flex flex-col items-center gap-6  w-full ">
           <Box>
           <Avatar size={'2xl'} />
           </Box>
           <Text fontFamily={'cursive'} fontSize={"xx-large"}>{income_caller?.name}</Text>
           <Text fontFamily={'cursive'} fontSize={"x-large"}>On going...</Text>
          
           <Box className="mt-60 md:mt-5 bg-red-600 size-16 rounded-full flex items-center justify-center" onClick={ondeclineclick} >
             <FaPhoneAlt size={"30px"} color="white"  />
           </Box>
         </Box>
       </Box>
     ) : (
       // Outgoing call
       <Box className="text-green-600  w-full ">
         <Box className="flex flex-col  gap-6 items-center   w-full ">
           <Box>
           <Avatar size={'2xl'}  />
           </Box>
          
           {!call_accept && (
             <Text fontFamily={'cursive'} fontSize={"xx-large"}>Calling to {msguser.username}...</Text>)}
          
           {call_accept && (
             <Box>
               <Text fontFamily={'cursive'} fontSize={"xx-large"}>{msguser.username}</Text>
               <Text fontFamily={'cursive'} fontSize={"x-large"}>On going...</Text>
             </Box>
           )}  
           
           <Box className="mt-60 md:mt-5 bg-red-600 size-16 rounded-full flex items-center justify-center" onClick={ondeclineclick}>
             <FaPhoneAlt size={"30px"} color="white" />
           </Box>
         </Box>
       </Box>
     )}
     
     </Box> 
     :
     <>
     <Box className="w-full h-full relative">
      
           
     {/* {MyStream && (
    <Box className="absolute  md:hidden" style={{ transform: 'scaleX(-1)' }}>
      <ReactPlayer
        playing
        muted
        height="900px"
        width="300px"
        url={MyStream}
      />
    </Box>
  )}
           ---------------------------------------Remote Stream--------------------- */}
           {/* Remote Stream - Fullscreen */}
  {/* ------------md-screen */}
    <Box className="hidden md:block md:w-full md:h-full md:absolute md:left-24  md:z-50" style={{ transform: 'scaleX(-1)' }}>
      {call_accept?
      <ReactPlayer
        playing
        // muted
         height="115%"
        width="130%"
      //  className='w-[200%] h-[115%]'
        
        url={RemoteStream}

      />:<ReactPlayer
      playing
      muted
      height="115%"
      width="130%"
      
      url={MyStream}

    />}
    </Box>
    {/* ---sm-screen--- */}
    
    <Box className=" w-full h-full md:hidden" style={{ transform: 'scaleX(-1)' }}>
      {call_accept?
      <ReactPlayer
        playing
        // muted
         height="100vh"
        width="100wh"
      //  className='w-[200%] h-[115%]'
        
        url={RemoteStream}

      />:<ReactPlayer
      playing
      muted
      height="100vh"
        width="100wh"
      
      url={MyStream}

    />}
    </Box>
 
  <Box className="flex gap-24 left-6 absolute md:top-[370px] z-50 md:left-28  items-center
  bottom-4
  ">
      {/* voice mute */}
            <Box onClick={toggleMute}>
            {isMuted?
            <IoIosMicOff size={"30px"} color="white"/>:<IoIosMic size={"30px"} color="white"/>}
            </Box>
            {/* endcall */}
           <Box className=" bg-red-600 size-16 rounded-full flex items-center justify-center" onClick={ondeclineclick}>
             <FaPhoneAlt size={"30px"} color="white" />
           </Box>

           {/* --videomute-- */}
           <Box onClick={toggleVideo}>
              {isVideoOff?<CiVideoOff size={"30px"} color="white" />:
              <CiVideoOn  size={"30px"} color="white"/>}
           </Box>
  </Box>
     </Box>
     </>}
    </>
  );
};

export default Room;