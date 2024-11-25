import { Box, Button, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaRegFaceGrin } from "react-icons/fa6";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoIosMic } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import { UsedbContext } from "../../Hooks/UsedbContext";
import AudioRecorder from "../AudioRecorder";
import { IoDocumentText } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { IoIosVideocam } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";

function MessageFotter({sendmsg,setmsg,msg,file,setfile,senderId,reciverId,conversationId }) 
{ 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

      
      const {uploadpdffirbase}=UsedbContext()
      const handleTextInput = (event) => {
        console.log(event.key)

          setmsg(event.target.value);
          console.log(msg)
      };
      const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
          event.preventDefault(); // Prevents the default action (like form submission)
          if(msg!='')
          sendmsg();
        }
      };
      const handleEmojiClick = (emoji) => {
        setmsg((prevMsg) => prevMsg + emoji.emoji);
        setShowEmojiPicker(false);
      };
  const Documentinput=(e)=>
    {
      setfile(e.target.files[0]);      
    }
    useEffect(()=>
    {
      const fileuploader=async()=>
        {
          
        }
        fileuploader()
    },[file,setfile,uploadpdffirbase])
   
  return (
    <>

    <div className="w-full">
        <div className="hidden md:flex gap-3 items-center mt-3">

          {showEmojiPicker&&<Box className="absolute bottom-24 z-40" left={"470px"}>
                 <EmojiPicker onEmojiClick={handleEmojiClick}/>
          </Box>}
          <FaRegFaceGrin size={"30px"} className="text-gray-500" onClick={()=>setShowEmojiPicker(!showEmojiPicker)} />
                 
                          
                          <Menu>
                              <MenuButton as={Button} borderRadius={"50px"}
                              _hover={"none"}
                              _focus={"none"}
                              _active={"none"}
                              >
                                <MdOutlineAttachFile size={"30px"} className=" text-gray-500" />
                              </MenuButton>
                                
                             
                              <MenuList>
                                <MenuItem className="flex gap-2">
                                <IoDocumentText size={"25px"} className="text-custompurple"/>
                                <label htmlFor="Documentinput">
                                  Document
                                  </label>
                                  </MenuItem>

                                <MenuItem className="flex gap-2">
                                <IoMdPhotos size={"25px"} className="text-blue-600"/>
                                <label htmlFor="imageinput">
                                  Photos</label></MenuItem>
                                <MenuItem className="flex gap-2">
                                  <IoIosVideocam size={"25px"} className="text-blue-600"/>
                                <label htmlFor="videoinput">
                                  Videos
                                </label>
                                  </MenuItem>
                                <MenuItem  className="flex gap-2">
                                <FaCamera size={"22px"} className="text-red-500"/>
                                <label htmlFor="camerainput">
                                Camera</label></MenuItem>
                                <MenuItem>
                                
                                Attend a Workshop</MenuItem>
                              </MenuList>
                            </Menu>
                            <Input type="file" name='file' 
                            onChange={(e)=>{Documentinput(e)}} display={'none'} 
                            id="imageinput"
                            accept="image/*"
                            />
                            <Input type="file" name='file' 
                            onChange={(e)=>{Documentinput(e)}} display={'none'} 
                            id="videoinput"
                            accept="video/*"
                            />

                            <Input type="file" name='file' 
                            onChange={(e)=>{Documentinput(e)}} display={'none'} 
                            id="Documentinput"
                            accept=".pdf,.txt,.xlsx,.xls,.doc,.docx,.odt"
                            />

           <Input type="text" 
                  
            placeholder="Type a message"
            border={'none'}
            fontSize={'larger'}
            bg={'transparent'}
            _focus={{ boxShadow: 'none', outline: 'none', border: 'none' }}
            value={msg}
            onChange={ handleTextInput }
            onKeyDown={handleKeyDown}

                          />

                         {/* <IoSend onClick={sendmsg}/> */}
                         <AudioRecorder 
                         id={conversationId+Date.now()}
            senderId={senderId}
            reciverId={reciverId}
            conversationId={conversationId}
            type={"Audio"}
            message={msg} 
            />
                          
        </div>


{/* --------------------------sm Screen-------------- */}

<div className="bg-customwhite w-full flex gap-2 ml-1 items-center md:hidden">
  {showEmojiPicker&&<Box className="absolute bottom-24 z-40" bg={'transparent'} >
                 <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Box>}
          <FaRegFaceGrin size={"40px"} className="text-gray-500" onClick={()=>setShowEmojiPicker(!showEmojiPicker)} />
           
                            <Input type="file" name='file' 
                            onChange={(e)=>{Documentinput(e)}} display={'none'} 
                            id="imageinput"
                            accept="image/*"
                            />
                            <Input type="file" name='file' 
                            onChange={(e)=>{Documentinput(e)}} display={'none'} 
                            id="videoinput"
                            accept="video/*"
                            />

                            <Input type="file" name='file' 
                            onChange={(e)=>{Documentinput(e)}} display={'none'} 
                            id="Documentinput"
                            accept=".pdf,.txt,.xlsx,.xls,.doc,.docx,.odt"
                            />

           <Input type="text" 
                  
            placeholder="Type a message"
            border={'none'}
            fontSize={'larger'}
            bg={'transparent'}
            onKeyDown={handleKeyDown}
            _focus={{ boxShadow: 'none', outline: 'none', border: 'none' }}
            value={msg}
            onChange={ handleTextInput }

                          />
                         
                         <Menu>
                             <MenuButton as={Button} borderRadius={"50px"}
                             _hover={"none"}
                             _focus={"none"}
                             _active={"none"}
                             bg={'transparent'}
                             >
                               <MdOutlineAttachFile size={"30px"} className=" text-gray-500" />
                             </MenuButton>
                               
                            
                             <MenuList>
                               <MenuItem className="flex gap-2">
                               <IoDocumentText size={"25px"} className="text-custompurple"/>
                               <label htmlFor="Documentinput">
                                 Document
                                 </label>
                                 </MenuItem>

                               <MenuItem className="flex gap-2">
                               <IoMdPhotos size={"25px"} className="text-blue-600"/>
                               <label htmlFor="imageinput">
                                 Photos</label></MenuItem>
                               <MenuItem className="flex gap-2">
                                 <IoIosVideocam size={"25px"} className="text-blue-600"/>
                               <label htmlFor="videoinput">
                                 Videos
                               </label>
                                 </MenuItem>
                               <MenuItem  className="flex gap-2">
                               <FaCamera size={"22px"} className="text-red-500"/>
                               <label htmlFor="camerainput">
                               Camera</label></MenuItem>
                               <MenuItem>
                               
                               Attend a Workshop</MenuItem>
                             </MenuList>
                           </Menu>
                         {/* <IoSend onClick= {sendmsg}/> */}
                         <IoIosMic size={'60px'} color="gray"/>
                         {/* <AudioRecorder 
                         id={conversationId+Date.now()}
            senderId={senderId}
            reciverId={reciverId}
            conversationId={conversationId}
            type={"Audio"}
            message={msg} 
            /> */}
                          
        </div>




    </div>
    </>
  )
}

export default MessageFotter