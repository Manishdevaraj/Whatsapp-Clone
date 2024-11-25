import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:
  {
    host:true,
    port:5173
  },
  env:
  {
    Zego_APP_Id:1705809035,
    Zego_Server_Id:"5e9955f577c946d9f88ee0841a960b37"
  }

})
