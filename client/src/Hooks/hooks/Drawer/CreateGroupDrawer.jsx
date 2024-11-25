import { Avatar, Box, Button, Checkbox, Input, Spinner, Text, Textarea } from '@chakra-ui/react'
import  { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { formatRelativeTime} from '../functions/Time';
import { useRef } from 'react';
import { Create_Group } from '../../../Services/api';
import { UsedbContext } from '../../UsedbContext';
import { RxCross1 } from "react-icons/rx";
function CreateGroupDrawer() {
    const [contactedUsers, setContactedUsers] = useState([]);
    const [searchname, setsearchname] = useState('');
    const [groupname, setgroupname] = useState('');
    const [selectedusers,setselectedusers] = useState([]);
    const [group, setgroup] = useState(false);
    const users = useSelector(state=>state.contacts.contactsList);

    const {currentwhatsappuser,setc_group} = UsedbContext();

    
    const checkref = useRef();
useEffect(() => {
  
  const fetchData = async () => {
    try {
      const filterdata=users.filter(user => user.username.includes(searchname))
      setContactedUsers(filterdata); 
    } catch (error) {
      console.error('Error fetching contact users:', error);
    }
  };

  fetchData();
}, [searchname,users]);


const selectuser = (item, e) => {
    if (e.target.checked) {
      selectedusers.push(item._id);
      console.log(selectedusers)


    } else {
      
        selectedusers.pop(item._id);
      console.log(selectedusers)

    }
  }

  const creategroup=async()=>
  {
    selectedusers.push(currentwhatsappuser._id);
    await Create_Group({members:selectedusers,rootadmin:currentwhatsappuser._id,groupname});
  }
  return (
    
    <Box border={'2px solid white'}  className='bg-customwhite w-full h-custom-height laptop:h-custom-height-2 desktop:h-custom-height tablet:h-custom-height-tab laptop:w-5/12' boxShadow={'0 10px 20px rgba(0, 0, 0, 0.3)'}>
     
     {!group &&<Box> 
      <Box className='flex justify-center bg-customgreen h-10 items-center'>
        <Text fontSize={'larger'} fontWeight={'bold'} m={2}>Add The Group Members</Text>
        <Box ml={'auto'} mr={4} onClick={()=>setc_group(false)} cursor={'pointer'}>
        <RxCross1 size={'20px'}/>
      </Box>
      </Box>
      {/* --------search - Input */}
      <Box className="flex gap-2 items-center w-12/12 m-2"
                 boxShadow={'xl'}
                  borderRadius={'11px'}
                  bgColor={'#f0f2f5'}
                  
                  >
                    <FaSearch size={'20px'}/>
                        <Input
                          type="text"
                          placeholder="Search..."
                          border={'none'}
                          fontSize={'larger'}
                          _focus={{ boxShadow: 'none', outline: 'none', border: 'none' }}
                          className="h-2"
                          onChange={(e)=>setsearchname(e.target.value)}
                        />
                        <Box>
            <Button colorScheme='teal'w={'full'} onClick={()=>setgroup(!group)}>Next</Button>
         </Box>
        </Box>

               {contactedUsers.length? contactedUsers.map((item,index)=>(
                <Box key={index} className="flex gap-4 flex-shrink  items-center text-gray-600  md:hover:bg-white "
                 onClick={()=>checkref.current.click()}
                >
                         <Box  onClick={()=>checkref.current.click()}>
                            <Checkbox colorScheme='green' 
                             onChange={(e) =>selectuser(item,e)}
                             ref={checkref}
                            />
                         </Box>
                     <Avatar name={item.username} src={item.userprofile } size={'lg'}/>
                     <Box>
                         <Text>{item.username}</Text>
                     </Box> 
                     <Box ml={'auto'}>
                      <Text color='teal'>{item.Activetime==='online'?"Online":(formatRelativeTime(item.Activetime))}</Text>
                    
                    </Box>   

                            
                </Box>
               )):
               <div className="flex justify-center items-center mt-40">
                <Spinner size='xl' />
              </div>}
           

         
    </Box>}
    {group&&
    <Box className='flex flex-col items-center justify-center gap-4 w-full'>
      <Box ml={'auto'} mr={4} mt={4} onClick={()=>setc_group(false)} cursor={'pointer'}>
        <RxCross1 size={'20px'}/>
      </Box>
         
        <Box>
                 <Avatar size={{base:'2xl',md:'3xl'}}/>
        </Box> 

        <Box borderBottom={'2px solid gray'}>
                             <Input
                                type="text"
                                placeholder="Enter the Group name"
                                border={'none'}
                                fontSize={'larger'}
                                _focus={{ boxShadow: 'none', outline: 'none', border: 'none' }}
                                className="h-2"
                                onChange={(e)=>setgroupname(e.target.value)}
                                />
        </Box>   

        <Box w={'full'} >
            <Button colorScheme='teal' w={'full'} onClick={creategroup}>Create</Button>
        </Box>    
        
    </Box>}
    </Box>
  )
}

export default CreateGroupDrawer