import { Box, Image, Spinner, Text } from "@chakra-ui/react"
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaFileWord } from "react-icons/fa";
import { BsFillFileEarmarkPptFill } from "react-icons/bs";
import { SiGooglesheets } from "react-icons/si"; 
import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { useEffect, useRef } from "react";
function Messagebody({messages,currentwhatsappuser}) {

      
  const messagesEndRef = useRef(null);


  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

      

      function formatTime(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        const adjustedHours = hours % 12 || 12;  // Convert 0 to 12 for 12-hour format
      
        return `${adjustedHours}:${minutes} ${ampm}`;
      }
      
 const downloadfiles=async(url)=>
  {
 
 
   window.open(url, '_blank');
  }     
      
          
  
  return (
    <>
      <Box className="
      overflow-y-auto no-scrollbar
      bg-slate-50 
      h-custom-height
      l2:h-[510px]
      SE:h-custom-height-2.2
      XR:h-custom-height-5
      PRO:h-custom-height-1.1
      PMAX:h-custom-height-6
      PIX:h-custom-height-5.5
      S8:h-custom-height-1.2
     
      desktop:h-custom-height-2
      nexsus:h-custom-height-2.8
      IPADMINI:h-custom-height-5.5
      IPADAir:h-custom-height-tab
      IPADPRO:h-custom-height-tab4
      Pro7:h-custom-height-tab2
      fold:h-custom-height-tab3
      rotate:h-custom-height-2.9
      rotate2:h-custom-height-5.5" 

      
      
     >
        {messages.map((item,index)=>
        (
          <Box 
          key={index} 
          p={2}>
          {currentwhatsappuser._id===item.senderId?
           <Box display="flex" flexDirection={"row-reverse"}>
                                        <Box 
                  className="p-2 flex items-center  bg-red-100 text-custompurple" 
                  borderRadius={"10px"}
                  maxW={"600px"} 

                  >
                    <Box className="flex items-center  gap-2">

                      
                          {item.type!="text"? 
                            
                            <Box>
                              {/* -----------Audio----------------------- */}
                              {item.type=="Audio"&&
                              
                                <audio src={item.url} controls />
                                
                              

                              }
                              {/* -----------Video----------------------- */}
                              {
                  item.type.startsWith("video/")&&
                  
                    <video src={item.url} width={'250px'} height={'250px'} controls/>
                    
                               }

                              {/* --------------------imges------ */}
                              {
                                item.type.startsWith("image/")&&
                                
                                  <Image src={item.url} width={'full'}/>
                                  
                                }
{/* -----------------------------files---------------- */}
              <Box className="flex items-center">
              {(item.type === "application/vnd.ms-powerpoint" || item.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") && <BsFillFileEarmarkPptFill />}
            {/* pdf logo */}
            {item.type === "application/pdf" && <FaFilePdf size={"40px"} color="red" />}
            {/* text logo */}
            {item.type === "text/plain" && <IoDocumentTextSharp size={"40px"} color="red" />}
            {/* word logo */}
            {(item.type === "application/msword" || item.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && <FaFileWord />}
            {/* sheets */}
            {(item.type === "application/vnd.ms-excel" || item.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && <SiGooglesheets />}
            <Text width={'fit-content'}
                    whiteSpace="pre-wrap" // Preserve whitespace, allow text wrapping
                    wordBreak="break-word"// Break long words to wrap within the container
                    overflow="hidden" >{item.message}</Text>
              </Box>
                                {/* // ------------time and downloads-- */}
                              <Box className="flex gap-5 items-center justify-end">
                                    <FaCloudDownloadAlt onClick={()=>downloadfiles(item.url)} size={"20px"}/>
                                    
                                    <Box className="flex items-center gap-3 ml-6">
                                      <Text ml={'auto'}>{formatTime(item.updatedAt)}</Text>
                                      {item.Status=='read'&&<IoCheckmarkDone color="teal"/>}
                                      {item.Status=='send'&&<IoMdCheckmark color="teal"/>}
                                      { item.Status=='loading'&&<Spinner/>}

                                    </Box>
                                </Box>
                            </Box>
                      

                     :
                     <Box className="flex flex-col ">
                      
                       <Text width={'fit-content'}
                    whiteSpace="pre-wrap" // Preserve whitespace, allow text wrapping
                    wordBreak="break-word"// Break long words to wrap within the container
                    overflow="hidden" >{item.message}</Text>
                      
                      <Box className="flex items-center gap-3 ml-6">
                        <Text ml={'auto'}>{formatTime(item.updatedAt)}</Text>
                        {item.Status=='read'&&<IoCheckmarkDone color="teal"/>}
                        {item.Status=='send'&&<IoMdCheckmark color="teal"/>}
                        { item.Status=='loading'&&<Spinner/>}

                      </Box>

                     </Box>
                     } 
                      
                      
                      
                      
           
            </Box>
            </Box>
            
            </Box>
            :
            <Box>
                                        <Box 
                  className=" p-2 flex items-center bg-gray-100 text-custompurple" 
                  width={'fit-content'}
                  borderRadius={"10px"}
                  maxW={"600px"} 

                  >
                   <Box className="flex items-center  gap-2">

                      
{item.type!="text"? 
  
  <Box>
    {/* -----------Audio----------------------- */}
    {item.type=="Audio"&&
    
      <audio src={item.url} controls />
      
    

    }
    {/* -----------Video----------------------- */}
    {
      item.type.startsWith("video/")&&
      
        <video src={item.url} width={'full'} height={'full'} controls/>
        
      }

    {/* --------------------imges------ */}
    {
      item.type.startsWith("image/")&&
      
        <Image src={item.url} width={'full'}/>
        
      }
{/* -----------------------------files---------------- */}
<Box className="flex items-center">
{(item.type === "application/vnd.ms-powerpoint" || item.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation") && <BsFillFileEarmarkPptFill />}
{/* pdf logo */}
{item.type === "application/pdf" && <FaFilePdf size={"40px"} color="red" />}
{/* text logo */}
{item.type === "text/plain" && <IoDocumentTextSharp size={"40px"} color="red" />}
{/* word logo */}
{(item.type === "application/msword" || item.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && <FaFileWord />}
{/* sheets */}
{(item.type === "application/vnd.ms-excel" || item.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && <SiGooglesheets />}
<Text width={'fit-content'}
whiteSpace="pre-wrap" // Preserve whitespace, allow text wrapping
wordBreak="break-word"// Break long words to wrap within the container
overflow="hidden" >{item.message}</Text>
</Box>
      {/* // ------------time and downloads-- */}
    <Box className="flex gap-5 items-center justify-end">
          <FaCloudDownloadAlt onClick={()=>downloadfiles(item.url)} size={"20px"}/>
          <Text>{formatTime(item.updatedAt)}</Text>
      </Box>

  </Box>


:
<Box className="flex flex-col ">

<Text width={'fit-content'}
whiteSpace="pre-wrap" // Preserve whitespace, allow text wrapping
wordBreak="break-word"// Break long words to wrap within the container
overflow="hidden" >{item.message}</Text>

<Text ml={'auto'}>{formatTime(item.updatedAt)}</Text>
</Box>
} 





</Box>
                    
                  </Box>

           </Box>
          }
                    
                    <div ref={messagesEndRef} />
          </Box>
        ))}
      </Box>
    
    </>
  )
}

export default Messagebody