import { io } from "socket.io-client";

// const SOCKET_SERVER_URL = 'http://localhost:5000';
 const SOCKET_SERVER_URL="https://whatsapp-clone-server-5fko.onrender.com"


export const socket = io(SOCKET_SERVER_URL, {
    transports: ['websocket'], // Use websocket as the transport protocol
  });

