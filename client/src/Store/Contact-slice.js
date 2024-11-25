import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contactsList: [],
    groupList: [],
   
  },
  reducers: {
    setContacts: (state, action) => {
      state.contactsList = action.payload;
    },
    pushContact:(state,action)=>
      {
        state.contactsList.push(action.payload);
      },
    setGroup: (state, action) => {
      state.groupList = action.payload;
    },
    pushGroup:(state,action)=>
      {
        state.groupList.push(action.payload);
      }
  },
});


export default contactsSlice;
