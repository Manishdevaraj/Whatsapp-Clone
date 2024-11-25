import { createSlice } from "@reduxjs/toolkit";


const messageSlice=createSlice(
    {
        name:'Messages',
        initialState:
        {
            MessageList:{}
        },
        reducers:
        {
           setmessageList:(state,action)=>
            {
                const {id,messages}=action.payload;
                state.MessageList[id]=messages;
            }
        }

        
    }
)

export default messageSlice;