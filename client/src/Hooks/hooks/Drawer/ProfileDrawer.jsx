import { Avatar, Box, Button, Input, Text } from "@chakra-ui/react"
import { UsedbContext } from "../../UsedbContext"
import { MobileAuthentication, Updateusername } from "../../../Services/api";
import { useRef, useState } from "react";


function ProfileDrawer() {
 

    const {logout,currentwhatsappuser,user,setcurrentuser,upload_profile}=UsedbContext();
    const [username,setusername]=useState();
    const [ut,setut]=useState(false);
    const profileref = useRef(null);
    const updatename=async()=>
      {
        await Updateusername({id:currentwhatsappuser._id,name:username});
        const user2=await MobileAuthentication(user.phoneNumber);
        setcurrentuser(user2);
        setut(false);
      }
    const onusernameclick =()=>
      {
           setut(true);
      }  
    const onChangeProfile = () => {
        profileref.current.click();
      };
      const uploadprofile=async(e)=>
      {
        // console.log(e.target.files[0]);
        const file=e.target.files[0];
        const id=file.name+Date.now();
        await upload_profile(file,id,currentwhatsappuser._id);
        const user2=await MobileAuthentication(user.phoneNumber);
        setcurrentuser(user2);
      }
  return (
    <>
      <Box className='w-full flex flex-col bg-chatbg md:w-4/12'>
        {/* ------Header-------Text-------- */}
        <Box p={5}>
          <Text fontSize={"xx-large"} fontWeight={"bold"}>Profile</Text>
        </Box>

        {/* --------profile----picture---- */}
        <Box className="flex flex-col  justify-center items-center h-56" bgColor={'#eaf2f5'}>
           <Avatar size={{base:'2xl',md:'2xl'}} src={
currentwhatsappuser.userprofile}/>
           <Text fontFamily={'cursive'} fontSize={'large'} fontWeight={'bold'}>{currentwhatsappuser.username}</Text>
        </Box>

        <Box className="flex gap-3 mt-3 m-3">
          <Button onClick={onChangeProfile }><Text fontFamily={'cursive'}>Change profile</Text></Button>
          <Input ref={profileref} accept="image/*" type="file" display={'none'}
          onChange={(e)=>uploadprofile(e)}
          />
          <Button><Text fontFamily={'cursive'} onClick={onusernameclick}>Change username</Text></Button>

        </Box>
         {ut&&<Box className="flex flex-col ">
              <Input value={username} onChange={(e)=>setusername(e.target.value)}/>
              <Button><Text fontFamily={'cursive'} onClick={updatename}>Update</Text></Button> 
         </Box>}

        <Box onClick={logout} className="mt-auto w-full">
            <Button w={'full'} colorScheme="teal">LogOut</Button>
        </Box>
      </Box>
    </>
  )
}

export default ProfileDrawer
