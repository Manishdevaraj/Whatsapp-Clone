import { configureStore,} from "@reduxjs/toolkit";
import ContactSlice from "./Contact-slice";
import messageSlice from "./Message-slice";

const store = configureStore({
  reducer: {
    contacts: ContactSlice.reducer,
    Messages: messageSlice.reducer,
  },
 
});

export default store;
