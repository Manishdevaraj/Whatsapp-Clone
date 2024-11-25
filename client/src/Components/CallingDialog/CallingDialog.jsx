import { Avatar, Box, Text } from "@chakra-ui/react";
import { UsedbContext } from "../../Hooks/UsedbContext";
import { FaPhoneAlt } from "react-icons/fa";
import { socket } from "../../Services/socket";
import { useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import peer from "../../Services/peer";


function CallingDialog({ incomecall,income_caller,setincoming_call,setchat }) 
{

  
}

export default CallingDialog;


// const [call_accept, setcall_accept] = useState(false);
 

//   const { msguser, setisCalling,remoteSocketId,calltype } = UsedbContext();

 
  
//   const [MyStream,setMyStream] = useState();
//   const [RemoteStream,setRemoteStream] = useState();

  
// useEffect(()=>
//   {
//       const getusermedia =async()=>
//         {
          
//             if(calltype==='Voice')  
//               {
//               const stream=await navigator.mediaDevices.getUserMedia({audio:true});
//               setMyStream(stream);
//               }
//             else if(calltype==='Video')
//             {
//               const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
//             setMyStream(stream);
//             }  
//         }
//        getusermedia()
         
        
//   },[calltype, incomecall])


//   const declinecall = () => {
//     setisCalling(false);
//     setincoming_call(false);
//     setcall_accept(false);
//     setchat(true);
//     console.log("hellopppppppppppppppppppppppppppppppppppppppppppp");
  
//     // Emit a socket event to notify that the call has been declined
//     if (incomecall) {

//       console.log("Income call declined...");
//       socket.emit("reciver-Call-decline", { id: income_caller.callerid});
//     } else {
//       console.log("outgoing call declined...");
//       socket.emit("Outgoing-Call-declined", { id: msguser._id, msg: "from caller" });
//       console.log("Outgoing call declined...");
 
//        // Cleanup the PeerConnection
//         // peer.cleanup();
  
//      // Reset the streams
//      if (MyStream) {
//        MyStream.getTracks().forEach(track => track.stop());
//        setMyStream(null);
//      }
//      setRemoteStream(null);
//     }
  
//   };


//   const sendStreams = useCallback(() => {
//     if (MyStream) {
//       for (const track of MyStream.getTracks()) {
//         peer.peer.addTrack(track, MyStream);
//       }
//     }
//   }, [MyStream]);
  
//   const handel_call_accept = useCallback((data) => {

//     console.log("from socket outgoing", data.ans);
//     peer.setLocalDescription(data.ans);
//     setcall_accept(true);
//     sendStreams()
//    },[sendStreams]);

//    useEffect(() => {
//     peer.peer.addEventListener("track", async (ev) => {
//       const remoteStream = ev.streams;
//       console.log("GOT TRACKS!!");
//       setRemoteStream(remoteStream[0]);
//     });
//   }, []);

//   useEffect(() => {

//     const reciver_call_decline = (data) => {
//       setisCalling(false);
//       console.log("from call dilog small dicline by reciver", data);
     
      
     

//     };
//     const reciver_incomecall_decline = (data) => {
//       setisCalling(false);
//       console.log("from socket outgoing", data);
     

//     };

    
    

//     socket.on("incomeing-Call-declined", reciver_incomecall_decline);
//     socket.on("Outgoing-Call-declined-msguser", reciver_call_decline);
//     socket.on("Call-Accepted", handel_call_accept);

//     return () => {
//       socket.off("Outgoing-Call-declined-msguser", reciver_call_decline);
//       socket.off("Call-Accepted", handel_call_accept);
//     };
//   }, [handel_call_accept, sendStreams, setisCalling]);
// // -----------------------------------webrtc setup------------------





// const handleNegoNeeded = useCallback(async () => {
//   try {
//     if (peer.isNegotiating) {
//       console.log("Negotiation already in progress...");
//       return; // Prevent duplicate negotiations
//     }

//     peer.isNegotiating = true; // Set negotiating flag
//     const offer = await peer.getoffer();
//     console.log("negotiation needed offer", offer);
//     socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//   } catch (error) {
//     console.error("Error during negotiation needed:", error);
//   } finally {
//     setTimeout(() => {
//       peer.isNegotiating = false; // Reset flag after timeout to avoid race conditions
//     }, 1000); // Adjust timeout as needed
//   }
// }, [remoteSocketId]);


// useEffect(() => {
//   if (peer?.peer) {
//     const onNegotiationNeeded = handleNegoNeeded;
//     peer.peer.addEventListener("negotiationneeded", onNegotiationNeeded);

//     return () => {
//       peer.peer.removeEventListener("negotiationneeded", onNegotiationNeeded);
//     };
//   }
// }, [handleNegoNeeded]);
//   // Add peer and handleNegoNeeded as dependencies



// const handleNegoNeedIncomming = useCallback(
//   async ({ from, offer }) => {
//     try {
//       console.log("Handling incoming negotiation offer...",offer);
//       const ans = await peer.getanswer(offer);
//       socket.emit("peer:nego:done", { to: remoteSocketId, ans});
//       console.log("Handling incoming negotiation answer...",ans);
//     } catch (error) {
//       console.error("Error handling incoming negotiation offer:", error);
//     }
//   },
//   [remoteSocketId]
// );

// const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//   try {
//     console.log("Finalizing negotiation...");
//     await peer.setLocalDescription(ans);
//   } catch (error) {
//     console.error("Error finalizing negotiation:", error);
//   }
// }, []);




// useEffect(() => {
  
  
//   socket.on("peer:nego:needed", handleNegoNeedIncomming);
//   socket.on("peer:nego:final", handleNegoNeedFinal);
//   socket.on("user:joined",(data)=>
//   {
//     console.log(data+"is joinde on call or room");
//   });
//   socket.on("room:join",(data)=>
//   {
//     console.log(data+"is joinde on call or room");
//   });

//   return () => {

//     socket.off("peer:nego:needed", handleNegoNeedIncomming);
//     socket.off("peer:nego:final", handleNegoNeedFinal);
//     socket.off("room:join");
//     socket.off("room:join");
//   };
// },[])

// // ----------------------Automaticalyy send the remote stream-----------------------
// useEffect(()=>
// {
//    if(incomecall)
//     {
//       if(MyStream)
//         {
//           sendStreams();
//         }
//     }
// },[MyStream, incomecall, sendStreams])

//   return (
//     <>          
     
//       {calltype==='Voice'?
     
// <Box className=" flex justify-center w-full ">
//     <Box display={'block'}>
//       <ReactPlayer
//               playing
//               // muted 
//               width={100}    
//               url={RemoteStream} 
//             /> 
//     </Box>
// {incomecall ? (
//   // Incoming call
//   <Box className="mt-10 text-purple-600">
//     <Box className="flex flex-col items-center gap-6">
//       <Avatar size={'2xl'} src={income_caller.img} />
//       <Text fontFamily={'cursive'} fontSize={"xx-large"}>{income_caller.name}</Text>
//       <Text fontFamily={'cursive'} fontSize={"x-large"}>On going...</Text>
     
//       <Box className="mt-60 bg-red-600 size-16 rounded-full flex items-center justify-center" onClick={declinecall}>
//         <FaPhoneAlt size={"30px"} color="white" />
//       </Box>
//     </Box>
//   </Box>
// ) : (
//   // Outgoing call
//   <Box className="flex justify-center w-full mt-10 text-purple-600">
//     <Box className="flex flex-col items-center gap-6">
//       <Avatar size={'2xl'} src={msguser.userprofile} />
//       {/* <Text fontFamily={'cursive'} fontSize={"xx-large"}>{msguser.username}</Text> */}
//       {!call_accept && (
//         <Text fontFamily={'cursive'} fontSize={"xx-large"}>Calling to {msguser.username}...</Text>
//       )}
//       {call_accept && (
//         <Box>
//           <Text fontFamily={'cursive'} fontSize={"xx-large"}>{msguser.username}</Text>
//           <Text fontFamily={'cursive'} fontSize={"x-large"}>On going...</Text>
//         </Box>
//       )}  
      
//       <Box className="mt-60 bg-red-600 size-16 rounded-full flex items-center justify-center" onClick={declinecall}>
//         <FaPhoneAlt size={"30px"} color="white" />
//       </Box>
//     </Box>
//   </Box>
// )}

// </Box> 
// :
// <>
// <div className="flex  justify-center">
 
      
// <div className="absolute right-5 top-5 z-50" style={{ transform: 'scaleX(-1)' }}>
  
//       {MyStream && (
//         <>
         
//           <ReactPlayer
//             playing
//             muted
//             height="300px"
//             width="300px"
//             url={MyStream}
//           />
//         </>
//       )}
//       </div> 
//       {/* ---------------------------------------Remote Stream--------------------- */}
//       <Box className="w-full mr-40 rounded-xl" style={{ transform: 'scaleX(-1)' }} >
//       {RemoteStream && (
//           <ReactPlayer
//             playing
//             muted
//             height="700px"
//             width="700px"
//             url={RemoteStream}
//           />
      
    
//   )}
//       </Box> 
//       <Box className="absolute bottom-5  right-28 bg-red-600 size-16 rounded-full flex items-center justify-center" onClick={declinecall}>
//         <FaPhoneAlt size={"30px"} color="white" />
//       </Box>
// </div>
// </>}
//     </>

//   );