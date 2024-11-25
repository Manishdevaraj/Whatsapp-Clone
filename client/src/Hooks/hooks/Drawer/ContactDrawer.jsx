import { Avatar, Box,  Button,  Input, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Contact_add, Contact_new_User, Get_All_Request, Request_new_user_to_connect, setnewconversation } from "../../../Services/api";
import { UsedbContext } from "../../UsedbContext";
import { socket } from "../../../Services/socket";
import { IoIosTimer } from "react-icons/io";
import { IoMdCloudDone } from "react-icons/io";
function ContactDrawer() {
  const [searchname,setsearchname]=useState('');
  const [Users,setUsers]=useState([]);
  const [requests,setrequests]=useState([]);
  const [refresh,setrefresh]=useState(true);

  const {currentwhatsappuser}=UsedbContext()


    useEffect(() => {
        const fetchData = async () => {
          try {
            const users = await Contact_new_User();
            console.log(users);
            const filteredUsers = users.filter(
              (user) => user._id !== currentwhatsappuser._id
            );
             
            const req=await Get_All_Request();
            setrequests(req);
            const filterdata=filteredUsers.filter(user => user.username.includes(searchname))
            setUsers(filterdata); 
          } catch (error) {
            console.error('Error fetching contact users:', error);
          }
        };
      
        fetchData();
      }, [searchname, refresh, currentwhatsappuser._id]);
     


            const handelConnection=async(item)=>
              {
                const data=
                {
                  senderId:currentwhatsappuser?._id,
                  reciverId:item?._id,
                }
                await Request_new_user_to_connect(data);
                setrefresh(!refresh)
              }
    
              console.log(requests);
  return (
    <>
     <Box className=" w-full md:w-3/12">

     <div className="flex items-center gap-2 p-5 w-full">
                  <Box className="flex gap-2 items-center"
                 boxShadow={'xl'}
                  borderRadius={'11px'}
                  bgColor={'#f0f2f5'}
                  width={{base:'300px',md:"600px"}}
                  >
                    <FaSearch size={'20px'}/>
                        <Input
                          type="text"
                          fontFamily={'cursive'}
                          placeholder="Search for users..."
                          border={'none'}
                          fontSize={'larger'}
                          _focus={{ boxShadow: 'none', outline: 'none', border: 'none' }}
                          className="h-2"
                          onChange={(e)=>setsearchname(e.target.value)}
                        />
                    </Box>

                    {/* <RiBarChartHorizontalLine size={'20px'}/>  */}

           </div>
              
     <Box className="flex flex-col gap-2 w-full mt-2 overflow-y-auto">

               {Users.length? Users.map((item,index)=>{
                
                const isPending = requests.some(req => req.reciverId === item._id && req.Status === "pending"&&req.senderId==currentwhatsappuser._id);
                const isconnected = item.Contacts.includes(currentwhatsappuser._id);

                // if(item._id===currentwhatsappuser._id);
                // {
                //   Users.pop(item);
                
                // }
                
                
                return(
                  <Box key={index} className="flex gap-4 flex-shrink  items-center text-gray-600  hover:bg-customwhite ">
                         <Avatar name={item.username} src={item.userprofile } size={'lg'}/>
                         <Box>
                             <Text>{item.username}</Text>
                             
                         </Box> 
                         <Box ml={'auto'}>
                          {/* {formatTime(item.Activetime)} */}
                          {isPending&&<Button isDisabled={true}>
                                <Box className="flex flex-row items-center">
                                <IoIosTimer size={20}/>
                                <Text>Pending</Text>
                                </Box>
                            </Button>}

                         {(!isPending&&!isconnected)&& <Button colorScheme="purple" onClick={()=>handelConnection(item)}>Connect</Button>}

                         {isconnected&&<IoMdCloudDone color="green" size={"40px"} />}

                        </Box>

                        


                                
                    </Box>
                  
                )
              
               }):
               <div className="flex justify-center items-center mt-40">
                <Spinner size='xl' />
              </div>}
           </Box>
       
      

           


                    
                     
                            
            
     </Box>
    </>
  )
}

export default ContactDrawer