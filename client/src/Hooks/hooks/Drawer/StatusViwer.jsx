import { useCallback, useEffect, useState } from 'react';
import { UsedbContext } from '../../UsedbContext';
import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { formatRelativeTime } from '../functions/Time';
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa";

import { update_status_view } from '../../../Services/api';
function StatusViewer() {
  const { statusitem,setstatusview,currentwhatsappuser} = UsedbContext();

  const [urls, setUrls] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [Viewed,setViewed] = useState([]);

  const handestatus_view=useCallback(()=>
  {
    update_status_view({m_id:statusitem.userid,u_id:currentwhatsappuser._id});
  },[currentwhatsappuser._id, statusitem.userid])

  useEffect(()=>
  {
    if(!Viewed.includes(statusitem.userid))
      {
        handestatus_view();
        Viewed.push(statusitem.userid);
      }
   
  },[Viewed, handestatus_view, statusitem.userid])

  useEffect(() => {
    if (statusitem && statusitem.urls) {
      setUrls(statusitem.urls);
    }

  }, [statusitem]);

  useEffect(() => {
    let timer;
   
    const currentMedia = urls[currentMediaIndex];
    if (currentMedia && currentMedia.type.startsWith('image')) {
      timer = setTimeout(() => {
        handleMediaEnd();
      }, 10000); // 40 seconds for image
    }
    return () => clearTimeout(timer);
  }, [currentMediaIndex, urls]);

  const handleMediaEnd = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % urls.length);
  };

  const renderMedia = () => {
    const currentMedia = urls[currentMediaIndex];
    if (currentMedia.type.startsWith('video')) {
      return (
        <ReactPlayer
          url={currentMedia.url}
          playing
          // controls
          playsinline
          width="100%"
          height="100%" 
          onEnded={handleMediaEnd}
        />
      );
    } else if (currentMedia.type.startsWith('image')) {
      return (
        <Image src={currentMedia.url} width="100%" height="100%" />
      );
    }
    return null;
  };

  const exit=()=>
    {
      setstatusview(false);
      setViewed([]);  
    }

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
            <Avatar src={statusitem.profile}/>
            <Box>
                <Text color={'whitesmoke'}>{statusitem.name}</Text>
                <Text color={'whitesmoke'}>{formatRelativeTime(statusitem.time)}</Text>
            </Box>
        </Box>
      <Box 
        className='w-full h-screen justify-center items-center' 
        display="flex" 
    
        flexDirection={'column'}
        
        >        
        <Box width={{base:'full',md:'40vw'}} height="100vh" position={'relative'}>
          {urls.length > 0 && renderMedia()}
        </Box>
      </Box>
      <Box cursor={'pointer'} className='hidden md:block mt-4 mr-20' onClick={exit}>
         <RxCross1 color='gray' size={'30px'} />
      </Box>
    </div>
  );
}

export default StatusViewer;
