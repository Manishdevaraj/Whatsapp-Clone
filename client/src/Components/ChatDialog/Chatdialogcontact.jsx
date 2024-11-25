import { Avatar, Box, Button, Image, Spinner, Text } from "@chakra-ui/react";
import { UsedbContext } from "../../Hooks/UsedbContext";
import {  setnewconversation } from "../../Services/api";
import { useEffect, useState } from "react";
import { formatTime } from "../../Hooks/hooks/functions/Time";
import { useSelector } from "react-redux";

function Chatdialogcontact({ searchname,onnewcontactclick }) {
  const { setcontactuser, currentwhatsappuser, setdialogtrue, setscreensmflase } = UsedbContext();

  const setmsgbox = async (item) => {
    if (window.innerWidth <= 768) {
      setscreensmflase();
    }
    setdialogtrue();
    setcontactuser(item);
    if (item.type === 'group') {
      return;
    } else {
      await setnewconversation({ senderId: currentwhatsappuser._id, reciverId: item._id });
    }
  };

  const [contactedUsers, setContactedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.contacts.contactsList);
  const groups = useSelector(state => state.contacts.groupList);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const combinedList = users.concat(groups);
        const filterdata = combinedList.filter(user => user.username.includes(searchname));
        setContactedUsers(filterdata);
      } catch (error) {
        console.error('Error fetching contact users:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchData();
  }, [groups, searchname, users]);

  return (
    <>
      <Box className="flex flex-col gap-2 w-full mt-2 overflow-y-auto">
        {loading?<div className="flex justify-center items-center mt-40">
            <Spinner size='xl' />
          </div>:
        (contactedUsers.length ? contactedUsers.map((item, index) => {
          // Find the matching message count
          const matchingMsg = currentwhatsappuser.msg?.find(ms=>(ms.id===item._id));
          
          const messageCount = matchingMsg ? matchingMsg.count : 0;
          // console.log(messageCount );

          return (
            <Box key={index} className="flex gap-4 flex-shrink items-center text-gray-600 p-2 hover:bg-customwhite" onClick={() => { setmsgbox(item); }}>
              <Avatar name={item?.username} src={item?.userprofile} size={'lg'} />
              
              <Box>
                <Text>{item?.username}</Text>
                <Text wordBreak={"initial"}>
                  {item.message?.length > 30 ? `${item?.message.slice(0, 30)}...` : item?.message}
                </Text>
              </Box>
              
              <Box ml={'auto'}>
                <Text color='teal'>{item.Activetime === 'online' ? "Online" : (formatTime(item.Activetime))}</Text>

                {messageCount > 0 && (
                  <Box className="bg-green-500 w-fit h-fit p-1 flex justify-center items-center" borderRadius={"100%"}>
                    <Text color={'white'}>{messageCount}</Text>
                  </Box>
                )}
              </Box>
            </Box>
          );
        }) : 
        (<div className="flex flex-col items-center justify-center w-full h-full">
                <Image src="/no user.svg" width={200}/>
                <Text>No friends yet! Then connect by now!</Text>
                <Button colorScheme="red" className="mt-3"
                onClick={()=>onnewcontactclick()}
                >Connect</Button>
        </div>)

          
        )}
      </Box>
    </>
  );
}

export default Chatdialogcontact;
