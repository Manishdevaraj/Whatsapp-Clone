import { Avatar, Box, Image} from "@chakra-ui/react"
import { PiChatCircleTextBold } from "react-icons/pi";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { UsedbContext } from "../Hooks/UsedbContext";
function Menu({ onAvatarClick,onSettingClick,onMsgClick,onStatusClick , onnewcontactclick}) {
   
   const  {currentwhatsappuser}=UsedbContext();
   return (
    <>
    <Box className="flex flex-col w-20 justify-center"
       bg={'transparent'}
       boxShadow={'xl'}
    >
         <Box className=" flex flex-col gap-8 items-center mt-5">
      
            <PiChatCircleTextBold size={'30px'} onClick={onMsgClick}/>
            <Box className="bg-green-600 w-3 h-3 rounded-full absolute top-8 left-8"></Box>
        
            {/* <MdGroups size={'30px'}/> */}
            <Image src='/status.svg' className="size-10" onClick={onStatusClick}/>
            <BiMessageRoundedAdd size={'30px'} onClick={ onnewcontactclick}/>
            {/* <MdOutlineStoreMallDirectory size={'30px'}/>
            <HiOutlineSpeakerphone size={'30px'}/> */}
               <CiHeart size={'30px'} onClick={onSettingClick}/>
               <Box className="bg-green-600 w-3 h-3  rounded-full absolute  
               top-[227px] left-7"></Box>
         </Box>
      {/*  menu footer */}
         <Box mt={'auto'} mb={{base:'none',md:'20px'}} className=" flex flex-col  items-center gap-8">
               <Avatar name='Dan Abrahmov' src={currentwhatsappuser?.userprofile} onClick={ onAvatarClick }/>
         </Box>
    </Box>
    </>
  )
}

export default Menu