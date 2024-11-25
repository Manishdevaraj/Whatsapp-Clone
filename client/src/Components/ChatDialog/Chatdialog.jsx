import { Box } from "@chakra-ui/react"
import Chatdialoghead from "./Chatdialoghead"
import Chatdialogcontact from "./Chatdialogcontact"
import { useState } from "react";




function Chatdialog({onnewcontactclick}) {


    const [searchname,setsearchname]=useState('');
  
  return (
    <>
    <div className=" md:h-full w-11/12  bg-chatbg md:w-4/12">
           <Box>
             <Chatdialoghead setsearchname={setsearchname} />
           </Box>
           {/* --------contacts---name------ */}
           {/* <div className="w-full bg-gray-300 h-1" /> */}
           <Box >
              <Chatdialogcontact searchname={searchname} onnewcontactclick={onnewcontactclick} />
           </Box>
           
    </div>
    </>
  )
}

export default Chatdialog