import { Box, Button, Input, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { CiMenuKebab } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { UsedbContext } from "../../Hooks/UsedbContext";

function Chatdialoghead({setsearchname}) {

  const {setc_group} = UsedbContext()
  return (
    <>
    {/* ---------------header-------- */}
    <div className="flex items-center p-4">
             
             <Box>
                   <Text fontSize={'xx-large'} fontWeight={'bold'}>Chats</Text>
             </Box>
               <Box className="flex items-center ml-auto gap-4">
              
                      
                        {/* -----dots--- */}
                        <Menu>
  <MenuButton as={Button} rightIcon={ <CiMenuKebab size={'25px'}/>}
   bg={'transparent'}
   _hover={{bg:'transparent'}}

  />
  <MenuList>
    <MenuItem onClick={()=>setc_group(true)}>Create the Group</MenuItem>    
  </MenuList>
</Menu>
                        
               </Box>
              
           </div>

           {/* -----------search bar with logo */}
           <div className="flex items-center gap-2 p-5 w-full">
                  <Box className="flex gap-2 items-center"
                 boxShadow={'xl'}
                  borderRadius={'11px'}
                  bgColor={'#f0f2f5'}
                  width={{base:'270px',md:"600px"}}
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
                    </Box>

                    <RiBarChartHorizontalLine size={'20px'}/> 

           </div>
    </>
  )
}

export default Chatdialoghead