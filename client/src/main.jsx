import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import { UsercontextProvoider } from './Hooks/DbContext.jsx'

import { ClerkProvider } from '@clerk/clerk-react'
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
      <ChakraProvider>
    <Provider store={store}>
    <UsercontextProvoider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <App />
            </ClerkProvider>
     </UsercontextProvoider>

     </Provider>
      </ChakraProvider>
     </BrowserRouter>
  </React.StrictMode>,
)
