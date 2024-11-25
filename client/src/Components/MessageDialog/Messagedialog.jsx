
import { useEffect, useState } from "react";
import { addnewmessage, ClearNotifier, getallmessage, getconversationdetails } from "../../Services/api";
import MessageFotter from "./MessageFotter"
import Messagebody from "./Messagebody"
import Messagedialoghead from "./Messagedialoghead"
import { UsedbContext } from "../../Hooks/UsedbContext";
import FilePreview from "../viewer/FilePreview";
import { socket } from "../../Services/socket";


function Messagedialog({onmdarrowclick}) {
  const {msguser,currentwhatsappuser,uploadpdffirbase,upload_img_firbase,upload_video_firbase,mainrefresher,setmainrefresher}=UsedbContext();
  const [msg,setmsg]=useState('');
  const [file,setfile]=useState();
  const [conversation,setconversation]=useState();
  const[messages,setmessages]=useState([]);
  const[refresh,setrefresh]=useState(false);
 

   
   useEffect(()=>
  {
    setmsg('')
    setfile(null)
    async function details()
    {
      setconversation(null);
      if(msguser.type==='group')
      {
        const msg=await getallmessage({conversationId:msguser.conversationid,senderid:currentwhatsappuser._id});
        setmessages(msg.data);
      }
      else
      {
        const conversationdetails=await getconversationdetails({senderId:currentwhatsappuser._id,reciverId:msguser._id});
        console.log('converation is set',conversationdetails.data)
        setconversation(conversationdetails.data);
             const msg=await getallmessage({conversationId:conversationdetails.data._id,senderid:currentwhatsappuser._id});
             setmessages(msg.data);

      }

      await ClearNotifier({id:currentwhatsappuser?._id,friendid:msguser._id});
      setmainrefresher(!mainrefresher);
     
    }
    details();
   
  },[msguser._id, currentwhatsappuser._id, refresh, msguser]);


 
 useEffect(() => {
  const handleMsgReceive = (data) => {
    console.log('Received msg from socket', data);
    setrefresh(!refresh);
  };

  socket.on('msg-recive', handleMsgReceive);

  // Cleanup function to remove the event listener
  return () => {
    socket.off('msg-recive', handleMsgReceive);
  };
}, [refresh]);






// ==================================text msg sender function==================
  const sendmsg=async()=>
  {
    if (!currentwhatsappuser?._id || !msguser?._id) {
      console.error("User IDs are not defined");
      return;
    }
       const message={
        senderId:currentwhatsappuser._id,
        reciverId:msguser._id,
        conversationId:msguser.conversationid?msguser.conversationid:conversation._id,
        type:"text",
        message:msg,
       }
       try {
         socket.emit('send-msg',message)
        await addnewmessage(message);
        setmsg(''); 
        setrefresh(!refresh);
      } catch (error) {
        console.error("Failed to send message", error);
      }
      // to toggle the use effect
      setmainrefresher(!mainrefresher);

  }
// ===================================filemsg sender======================================
  const sendfile=async(file)=>
    {
      console.log("from send file");
    
      const convId = msguser.conversationid ? msguser.conversationid : conversation._id;
      console.log(convId);
      if(file)
        {
          const id=file.name+Date.now();
          const file_intant_upload_data=
          {
            senderId:currentwhatsappuser._id,
            reciverId:msguser._id,
            conversationId:convId,
            type:file.type,
            message:file.name,
            Status:"loading",
            updatedAt:Date.now()

          }
          messages.push(file_intant_upload_data);
          if(file.type.startsWith("image/"))
            {
              console.log("from photos:",file.type);
              upload_img_firbase(file,id,convId,file.type);
              const data={reciverId:msguser._id}
              socket.emit('send-msg',data)
              setfile();
              
            }
          else if(file.type.startsWith("video/"))
            {
              console.log("from video:",file.type); 
              upload_video_firbase(file,id,convId,file.type);
              setfile();
              
            }
          else
          {

                console.log(file.type)
                console.log(file.name);
               
              try
              {
                await uploadpdffirbase(file,id,convId,file.type);
                setfile();
               
              }
              catch(err)
              {
                console.log(err);
              }
                }

        }
      setmainrefresher(!mainrefresher);

    }
    // ================dicloser for file==============
    const closepreview=()=>
      {
        setfile();
      }

      // emoj-haneler
     
 
  return (
    <>
       
            <div className="w-full flex flex-col h-full">
                    
                  <div>
                  <Messagedialoghead onmdarrowclick={onmdarrowclick}/>
                  </div>
                  
                  <div >
                  {file && (
            < FilePreview
            sendfile={sendfile}
            file={file}
            closer={closepreview} />
          )}

                  
                
                {!file&& <Messagebody 

messages={messages} currentwhatsappuser={currentwhatsappuser}/>}
               

                  </div>

                
              
               {!file
                   &&
                    
                        <MessageFotter sendmsg={sendmsg} setmsg={setmsg} msg={msg}
                        file={file} setfile={setfile} conversation={conversation}
                        setrefresh={setrefresh} refresh={refresh}
                        senderId={currentwhatsappuser?._id}
                        reciverId={msguser?._id}
                        conversationId={conversation?._id}
            type={"Audio"}
            message={msg} 
           
                        />
                   

                      }
              

                
                  
                             </div>
    
    </>
  )
}

export default Messagedialog