import { Avatar, AvatarBadge, Box, Button, Input, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { UsedbContext } from "../../UsedbContext";
import { Delete_My_status, Get_My_Status, get_details_status } from "../../../Services/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatRelativeTime } from "../functions/Time";
import { socket } from "../../../Services/socket";

function StatusDrawer() {

  const { upload_fb_Status, currentwhatsappuser,c_setstatusview, setstatusview, setstatusitem,c_setstatusitem } = UsedbContext();
  const [status, setStatus] = useState([]);
  const [mystatus, setmystatus] = useState([]);
  const [vi_mystatus, setvi_mystatus] = useState(false);
  const [v_status, setv_Status] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const inputref = useRef();

  useEffect(() => {
    const new_status_id = currentwhatsappuser?.new_Status;
    const viewed_status_id = currentwhatsappuser?.viewed_Status;
   
    
    // console.log("hellow", new_status_id);
    const getmystatus=async()=>
      {
        
        const res = await Get_My_Status({id:currentwhatsappuser._id});
        setmystatus(res);
      }
    const getDetails = async () => {
      const statusPromises = new_status_id.map(async (element) => {
        const res = await get_details_status({ id: element });
        return res;
      });

      const results = await Promise.all(statusPromises);
      setStatus(results);
    };
   const get_viewr_details =async()=>
    {
      setv_Status([]);
      if(viewed_status_id.length>0)
        {
            const statusPromises = viewed_status_id.map(async (element) => {
            const res = await get_details_status({ id: element });
            return res;
          });
        
      const results = await Promise.all(statusPromises);
      setv_Status(results);
        }
  }
  get_viewr_details();
    getDetails();
    getmystatus();
  }, [refresh, currentwhatsappuser]);

  const upload_new_status = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const id = file.name + Date.now();
      await upload_fb_Status(file, id, file.type);
    } else {
      console.log('file is not selected');
    }
  };

  const handesocketupdate = useCallback((data) => {
    console.log(data);
    setrefresh(!refresh);
  }, [refresh]);

  useEffect(() => {
    socket.on("status-update", handesocketupdate);
    return () => {
      socket.off("status-update", handesocketupdate);
    };
  }, [handesocketupdate]);
  
  const deletestatus=async(item)=>
    {
        await Delete_My_status({id:item._id,userid:currentwhatsappuser._id});
    }
  return (
    <div className="w-full md:w-6/12 bg-statuswhite flex flex-col gap-4">
      <div className="m-3">
        <div className="flex items-center">
          <Text fontSize={'x-large'} fontWeight={'bolder'} fontFamily={'cursive'}>Status</Text>
          <Box className="flex items-center ml-auto gap-9">
            <Menu>
              <MenuButton as={Button} rightIcon={<FiPlus size={'20px'} />} bg={'transparent'} _hover={'none'} _active={'none'} />
              <MenuList>
                <MenuItem onClick={() => inputref.current.click()}>Add Status</MenuItem>
              </MenuList>
            </Menu>
            <HiOutlineDotsVertical size={'20px'} />
          </Box>
        </div>
        <Input type="file" ref={inputref} id="videoinput" accept="video/*,image/*" display={'none'} onChange={upload_new_status} style={{ display: 'none' }} />
       
       
           
          </div>
          
          <div className="h-16 w-full flex items-center">
                <Menu>
                    <MenuButton as={Button}  bg={'transparent'} _hover={'none'} _active={'none'} >
                      <div className=" flex gap-2 items-center">
                        
                          <Avatar size={'md'} src={currentwhatsappuser?.userprofile}>
                            <AvatarBadge boxSize='1.60em' bg='green.500' >
                                <FiPlus color="white" size={"300px"}/>
                            </AvatarBadge>
                          </Avatar>
                        
                      
                      
                    </div>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => inputref.current.click()}>Photos & Videos</MenuItem>
                    </MenuList>
                  </Menu>
                  <Box onClick={()=> setvi_mystatus(!vi_mystatus)}>
                          <Text className="text-gray-700">My Status</Text>
                          <Text className="text-gray-400">Click to add status update</Text>
                  </Box>
          </div>

      <Box className="bg-customwhite" w={"full"} h={"20px"} />

      

      <div className="overflow-y-auto no-scrollbar">
      {/* ------------------------------------my Status--------------------- */}
      {vi_mystatus &&
        <div>
        <div className="m-3 md:m-7">
                    {mystatus.length > 0 &&<Text color={'teal'} fontSize={'large'}>My Status</Text>}
                    {!mystatus.length > 0 &&<Text color={'teal'} fontSize={'large'}>NO Status yet...</Text>}
         </div>
         <div className="m-2 w-full">
                      <Box className="flex flex-col gap-7 ">
                        {mystatus.length>0&& mystatus.map((item, index) => (
                          <Box key={index} className="flex items-center gap-3">
                              <Box className="flex gap-3 items-center"  onClick={() => {  c_setstatusview(true); c_setstatusitem(item) }}>
                                {item?.type.startsWith('image')?<Avatar src={item.url}/>:<Avatar/>}
                                <Box className="w-full">
                                  <Text className="text-gray-500">{formatRelativeTime(item?.updatedAt)}</Text>
                                </Box>
                              </Box>
                                <Button color={'teal'} ml={'auto'} onClick={()=>deletestatus(item)}>Delete</Button>
                          </Box>
                        ))}
                      </Box>
                      
                    </div>

        </div>}
                  {/* contact status */}

                  <div>
                    <div className="m-3 md:m-7">
                    {status.length > 0 &&<Text color={'teal'} fontSize={'large'}>RECENT</Text>}
                    {!status.length > 0 &&<Text color={'teal'} fontSize={'large'}>NO RECENT Updates</Text>}
                    </div>
                    <div className="m-2 w-full">
                      <Box className="flex flex-col gap-7">
                        {status.length > 0 && status.map((item, index) => (
                          <Box className="flex gap-3" key={index} onClick={() => { setstatusview(true); setstatusitem(item) }}>
                            <Avatar />
                            <Box className="w-full">
                              <Box className="bg-customwhite" w={"full"} h={"2px"} />
                              <Text>{item?.name}</Text>
                              <Text className="text-gray-400">{formatRelativeTime(item?.time)}</Text>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      
                    </div>
                  </div>
                      {/* -------------------view Status-------------- */}

            <div>
              <div className="m-3 md:m-7">
              {v_status.length > 0 && <Text color={'teal'} fontSize={'large'}>Viewed</Text>}
              </div>
              <div className="m-2 w-full">
                <Box className="flex flex-col gap-7">
                  {v_status.length > 0 && v_status.map((item, index) => (
                    <Box className="flex gap-3" key={index} onClick={() => { setstatusview(true); setstatusitem(item) }}>
                      <Avatar />
                      <Box className="w-full">
                        <Box className="bg-customwhite" w={"full"} h={"2px"} />
                        <Text>{item?.name}</Text>
                        <Text className="text-gray-400">{formatRelativeTime(item?.time)}</Text>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
              </div>
                {/* -------------------view Status-------------- */}
            </div>
                  </div>

    </div>
  );
}

export default StatusDrawer;
