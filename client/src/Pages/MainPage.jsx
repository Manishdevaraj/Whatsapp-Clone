import { Avatar, Box, Button, Text } from "@chakra-ui/react"
import Menu from "../Components/Menu"
import ProfileDrawer from "../Hooks/hooks/Drawer/ProfileDrawer"
import { useCallback, useEffect, useState } from "react";
import Messagedialog from "../Components/MessageDialog/Messagedialog";
import { UsedbContext } from "../Hooks/UsedbContext";
import Defaultmsg from "../Components/MessageDialog/Defaultmsg";
import Chatdialog from "../Components/ChatDialog/Chatdialog";

import StatusDrawer from "../Hooks/hooks/Drawer/StatusDrawer";
import { Contacted_Users, Get_Group, Get_Group_conversationid, getconversationdetails, MobileAuthentication } from "../Services/api";
import { socket } from "../Services/socket";
import ContactDrawer from "../Hooks/hooks/Drawer/ContactDrawer";
import { useDispatch } from "react-redux";
import contactsSlice from "../Store/Contact-slice";
import NotificationDrawer from "../Hooks/hooks/Drawer/NotificationDrawer";
import CallingDialog from "../Components/CallingDialog/CallingDialog";
import peer from "../Services/peer";
import StatusViwer from "../Hooks/hooks/Drawer/StatusViwer";
import Current_Status from "../Hooks/hooks/Drawer/Current_Status";
import CreateGroupDrawer from "../Hooks/hooks/Drawer/CreateGroupDrawer";
import { useNavigate } from "react-router-dom";
import Room from "./Room";

function MainPage() {

  const [profile, setProfile] = useState(false);
  const [chat,setchat]=useState(true);
  const [setting,setsetting]=useState(false);
  const [status,setstatus]=useState(false);
  const [contactnew,setcontactnew]=useState(false);

 

  const[incomingcall,setincomingcall]=useState(false);
  const[incoming_call,setincoming_call]=useState(false);
  const[callername,setcallername]=useState();
  const[callerimg,setcallerimg]=useState();
  const[callerid,setcallerid]=useState();
  const[incomecall_data,setincomecall_data]=useState();
  const {msguser,currentwhatsappuser,user,msgdilog, setdilogfalse,smscreen,isCalling,setisCalling,setRemoteSocketId,calltype,setcalltype,statusview,c_statusview,mainrefresher,c_group,setcurrentuser, setMyStream,MyStream,RemoteStream,setRemoteStream}=UsedbContext();

  const dispatch=useDispatch();

  const [refresh,setrefresh]=useState(true);

 

  useEffect(()=>
  {

    async function currentuserset()
    {
      if(user)
        {
          const user2=await MobileAuthentication(user.phoneNumber);
          setcurrentuser(user2);

          const fetchContacts = async () => {
            try {
              // Fetch the contacted users
              const res = await Contacted_Users({ userno: currentwhatsappuser?.MobileNumber });
              const res2 = await Get_Group({ userno: currentwhatsappuser?.MobileNumber });
          
              if (res) {
                // Use Promise.all to wait for all asynchronous operations inside map
                const updatedContacts = await Promise.all(
                  res.map(async (item) => {
          
                    // Fetch conversation details for each contact
                    const res22 = await getconversationdetails({ senderId:currentwhatsappuser._id, reciverId: item._id });
          
                    console.log(res22.data?.message);
          
                    // Push the message to the item
                    item.message = res22.data?.message;
                    console.log("item", item);
          
                    return item; // Return the updated item
                  })
                );
          
                console.log(updatedContacts);
          
                // Dispatch the updated contacts to the store
                dispatch(contactsSlice.actions.setContacts(updatedContacts));
              }
              if(res2)
                {
                  console.log('group',res2)
                  // Use Promise.all to wait for all asynchronous operations inside map
                const updatedGroup = await Promise.all(
                  res2.map(async (item) => {
          
                    // Fetch conversation details for each contact
                    const res22 = await Get_Group_conversationid({id:item.conversationid})
          
                    // console.log('group',res22);
          
                    // Push the message to the item
                    item.message = res22?.message;
                    // console.log("item", item);
                   
                    return item; // Return the updated item
                  })
                );
          
                console.log('item group',updatedGroup);
                dispatch(contactsSlice.actions.setGroup(updatedGroup));
               

                }

             
            } catch (error) {
              console.error("Error fetching contacts:", error);
            }

          };
          
              fetchContacts();
        }
      

    }
    currentuserset();
  },[refresh,mainrefresher]);
  
  // socket 
  const handesocketupdate=useCallback((data)=>
    {
      console.log(data);
      setrefresh(!refresh)
    },[refresh]);
  const handelbackendrefesh=useCallback((data)=>
    {
      console.log("hedjhbdkajhbndk",data);
      setrefresh(!refresh)
    },[refresh]);
    
    useEffect(()=>
      {
        socket.on('new-message',handesocketupdate)
        return ()=>
        {
          socket.off('new-message',handesocketupdate);
        }
      },[handesocketupdate])
   
    useEffect(()=>
    {
      socket.on("status-update",handesocketupdate)
      socket.on("backend-refesh",handelbackendrefesh)

      return ()=>
        {
          socket.off("status-update",handesocketupdate);
           socket.off("backend-refesh",handelbackendrefesh)

        }
    },[handelbackendrefesh, handesocketupdate])
 


    
   useEffect(()=>
  {     const handelcontact_user_add=(data)=>
    {
         console.log('Received user add from socket', data);
         setrefresh(!refresh);
    }
        socket.on('user-added-chat',handelcontact_user_add);

        return () => 
        {
               socket.off('user-added-chat',handelcontact_user_add);
        };

  },[refresh])
    
  // const contacts=useSelector(state=>state.contacts.contactsList)
  // console.log(contacts);
  // --------------------------------socket----------------functionalities
  const handel_offline=(data)=>
    {
        console.log(data.data);
      

    }

const handel_incoming_call=(data)=>
    {
 
        console.log(data);
        setincomecall_data(data);
        setincomingcall(true);
        setincoming_call(true);
        setcallername(data.name);
        setcallerimg(data.img);
        setcallerid(data.callerid);
        setRemoteSocketId(data.callerid);
        setcalltype(data.type);
        console.log(callerid);
    }    
    const handel_call_declined=(data)=>
      {
        setincomingcall(false);
        setisCalling(false);
        console.log('caller declied',data);
      }
    const reciver_call_decline=async(data)=>
      {
        // setincomingcall(false);
        setisCalling(false);
        console.log("fom socket out coing",data)

      }
      
useEffect(()=>
{
    socket.on("User-Offline",handel_offline);
    socket.on("incomming:call",handel_incoming_call);
    socket.on("incomeing-Call-declined",handel_call_declined);
    socket.on("Outgoing-Call-declined",reciver_call_decline);
    socket.on("Outgoing-Call-declined-msguser", reciver_call_decline);
    return ()=>
      {
          
            socket.off("User-Offline",handel_offline);
            socket.off("incomming:call",handel_incoming_call);
            socket.off("incomeing-Call-declined",handel_call_declined);
            socket.off("Outgoing-Call-declined",reciver_call_decline);
            socket.off("Outgoing-Call-declined-msguser", reciver_call_decline);

        }
},[])


const handel_incoming_declinebtn=()=>
  {
     setincomingcall(false);
     socket.emit("reciver-Call-decline",{id:callerid});
  }
  // const navigate=useNavigate();
 const onanswer_btn_click=async()=>
  { 

    setisCalling(true);
    setincomingcall(false);
    if(window.innerWidth<768) 
      {
        setchat(false);  
      }
      
    socket.emit("Answer-Sender-Call",{id:callerid});
    socket.emit("room:join",{room:incomecall_data.callerid+currentwhatsappuser._id});
    
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: calltype==='Voice'?false:true,
    });

    setMyStream(stream);
    console.log(`Incoming Call`, incomecall_data.offer);
    const ans = await peer.getanswer(incomecall_data.offer);
    socket.emit("call:accepted", { to: incomecall_data.callerid, ans });
    // navigate(`/room/${incomecall_data.callerid+currentwhatsappuser._id}`);
    
  } 
  return (
    <>
    {/* ------------------md--------------- */}
    {(!statusview&&!c_statusview)&&
    <div className=" md:flex flex-col ">
    <div className="hidden md:absolute w-screen h-40 bg-customgreen "/>
    <Box className="  flex md:relative md:mt-7 bg-customwhite md:mx-5 " 
    boxShadow={{base:'none',md:'xl'}}
    height={{base:'100vh',md:'90vh'}}
    
    
    >
      
      {/* ----------------------------Chats------------container which show contact an menu*/}
     

         {smscreen&&   <Menu  
                   onAvatarClick={() => {
                    setProfile(true);
                    setchat(false)
                    setstatus(false);
                    setcontactnew(false);

                    setsetting(false); 
                   }}
                   onMsgClick={()=>{
                    setsetting(false); 
                    setchat(true);
                    setProfile(false);
                    setcontactnew(false);

                    setstatus(false);
                   }}
                   onStatusClick={()=>{
                    setstatus(true);
                    setsetting(false); 
                    setchat(false);
                    setcontactnew(false);

                    setProfile(false)}}
                   onSettingClick={()=>{
                    setstatus(false);
                    setsetting(true); 
                    setchat(false);
                    setcontactnew(false);

                    setProfile(false);
                  }
                  }
                    onnewcontactclick={()=>
                      {
                        setstatus(false);
                        setsetting(false); 
                        setchat(false);
                        setProfile(false) ;
                        setcontactnew(true);
                      }
                    }
                  
            />}
            {smscreen&&chat&&<Chatdialog  onnewcontactclick={()=>
                      {
                        setstatus(false);
                        setsetting(false); 
                        setchat(false);
                        setProfile(false) ;
                        setcontactnew(true);
                      }
                    }/>} 
            {profile && <ProfileDrawer/>} 
            {setting&&<NotificationDrawer/>}
            {status&&<StatusDrawer/>} 
            {contactnew&&<ContactDrawer/>}
       {/* ---------------Message contaiine   left side of page which shos default msg page or contact msg page **/}
    
        
          {/* -----md screen--- */}
          
            <div className="hidden md:block w-full">
              
            {(msgdilog&&msguser)?<Messagedialog onmdarrowclick={setdilogfalse}/>:<Defaultmsg/>}
         </div>
           {/* --------sm screen--- */}
           

              <div className="block md:hidden">

                {(!smscreen&&msgdilog&&msguser)&&<Messagedialog onmdarrowclick={ setdilogfalse}/>}
              </div>
          
           
           
   
            
          
            </Box>
            {/* ---------------------incomin call dialog */}
            {incomingcall&&
  
       
        <Box className="absolute rounded-xl flex items-center gap-7 p-5 bg-gray-800 text-green-500 top-5 md:bottom-5 md:top-auto right-5 z-50" w={"300px"}>
            <Avatar size={'md'} src={callerimg}/>
            <Box>
                <Box >
                    <Text fontFamily={'cursive'}
                    fontSize={"larger"}
                    > {callername}</Text>
                    <Text fontFamily={'cursive'}>Incomming {calltype} Call </Text>
                </Box>

                <Box className="flex items-center gap-4 mt-2">
                        <Button colorScheme="red" onClick={handel_incoming_declinebtn}>Decline</Button>
                        <Button colorScheme="teal" onClick={onanswer_btn_click}>Answer</Button>
                </Box>
            </Box>
        </Box>   
 }
            </div>}
            {statusview&&<StatusViwer/>}
            {c_statusview&&<Current_Status/>}
        {c_group&&<Box className="absolute top-5  w-full h-full">
              <Box className="flex items-center justify-center gap-4 p-5">

                  <CreateGroupDrawer/>
              </Box>
        </Box>}


        {isCalling&&
        <Box className="absolute bg-gray-800 w-full h-full top-0 md:w-[600px] 
        md:h-[400px] md:top-44 md:left-[500px] md:rounded-xl ">
           <Room incomecall={incoming_call} income_caller={incomecall_data} setincoming_call={setincoming_call} setchat={setchat}/>
        </Box>}
    </>

  )

 
}
export default MainPage