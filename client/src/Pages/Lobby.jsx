import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { socket } from "../Services/socket";

function Lobby() {
    const [email,setemail]=useState();
    const [room,setroom]=useState();

    const navigate=useNavigate();

    const handeljoinroom=useCallback((data)=>
        {
              const {email,room}=data; 
              console.log(email);
              console.log(data);
              navigate(`/room/${room}`);

        },[navigate])
    useEffect(()=>
    {
        socket.on('room:join',handeljoinroom)
        return ()=>
            {
                socket.off('room:join',handeljoinroom)
        
            }
    },[handeljoinroom])

    const handelsubmit=()=>
        {
           console.log("email: ",email);
           console.log("room: ",room);
           socket.emit("room:join",{email,room})
        }
  return (
    <>
    <div>
    <input type="text" placeholder="email id" value={email} onChange={(e)=>setemail(e.target.value)}/>
    <br />
    <input type="text" placeholder="room id" onChange={(e)=>setroom(e.target.value)} />
<br />
    <button onClick={handelsubmit}>Join</button>
    </div>
    </>
  )
}

export default Lobby