import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import { formatRelativeTime } from "../functions/Time";
import { UsedbContext } from "../../UsedbContext";
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import ReactPlayer from "react-player";



function Current_Status() {
  const {c_setstatusview,currentwhatsappuser,c_statusitem } = UsedbContext();
  useEffect(()=>
  {
     const timer = setTimeout(() => {
      exit();
    }, 10000);
    return ()=>clearTimeout(timer);
  },[])
  const exit=()=>
    {
      c_setstatusview(false);
    
    }

    const renderMedia = () => {
      
      if (c_statusitem.type.startsWith('video')) {
        return (
          <ReactPlayer
            url={c_statusitem.url}
            playing
            // controls
            playsinline
            width="100%"
            height="100%" 
            // onEnded={handleMediaEnd}
          />
        );
      } else if (c_statusitem.type.startsWith('image')) {
        return (
          <Image src={c_statusitem.url} width="100%" height="100%" />
        );
      }
      return null;
    };
     
      
  return (
    <div className='bg-gray-800 flex '>
      
    
       <Box cursor={'pointer'} className='hidden md:block mt-4 ml-20' onClick={exit}>
         <FaArrowLeft color='gray' size={'25px'}/>
       </Box>

       <Box className='fixed top-2 
       laptop:left-96  laptop:ml-20
       desktop:left-96  tablet:left-72  z-50 flex gap-6 justify-center items-center'
       
        >
             <div className='md:hidden block'onClick={exit}>
               <FaArrowLeft color='gray' size={'20px'}/>
             </div>
            <Avatar src={currentwhatsappuser.userprofile}/>
            <Box>
                <Text color={'whitesmoke'}>{currentwhatsappuser.username}</Text>
                <Text color={'whitesmoke'}>{formatRelativeTime(c_statusitem.updatedAt)}</Text>
            </Box>
        </Box>
      <Box 
        className='w-full h-screen justify-center items-center' 
        display="flex" 
        flexDirection={'column'}
        
        >        
        <Box width={{base:'full',md:'40vw'}} height="100vh" position={'relative'}>
          { renderMedia()}
        </Box>
      </Box>
      <Box cursor={'pointer'} className='hidden md:block mt-4 mr-20' onClick={exit}>
         <RxCross1 color='gray' size={'30px'} />
      </Box>
    </div>


  )
}

export default Current_Status