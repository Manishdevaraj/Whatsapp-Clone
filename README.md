
# 📱 WhatsApp Clone



## 🌟 Project Overview

This WhatsApp Clone is a modern messaging platform built with Vite for the frontend and Node.js for the backend. It supports real-time messaging, audio/video calls, and user statistics, making it a robust communication tool.

-   **📧 Real-Time Messaging** powered by **Socket.IO**.
-   **🎥 Audio/Video Calling** using **WebRTC**.
-   **📊 User Statistics** to track interactions and engagement.
-   **💾 Persistent Data Storage** with **MongoDB**.
-   **🎨 Stylish and Responsive UI** using **Tailwind CSS**.

----------

## 🛠️ Tech Stack

### 🖼️ Frontend

-   **Framework**: Vite
-   **Styling**: Tailwind CSS

### 💻 Backend

-   **Runtime**: Node.js
-   **Framework**: Express
-   **WebSockets**: Socket.IO
-   **Database**: MongoDB

----------

## 📦 Installation

### Clone the Repository

bash

Copy code

`git clone https://github.com/yourusername/whatsapp-clone.git  
cd whatsapp-clone` 

----------

### Backend Setup

1.  Navigate to the `server` directory:
    
    bash
    
    Copy code
    
    `cd server` 
    
2.  Install dependencies:
    
    bash
    
    Copy code
    
    `npm install` 
    
3.  Configure environment variables:  
    Create a `.env` file with the following:
    
    env
    
    Copy code
    
    `PORT=5000  
    MONGO_URI=your_mongodb_connection_string  
    JWT_SECRET=your_jwt_secret  
    SOCKET_PORT=3000` 
    
4.  Start the backend server:
    
    bash
    
    Copy code
    
    `npm run start` 
    

----------

### Frontend Setup

1.  Navigate to the `client` directory:
    
    bash
    
    Copy code
    
    `cd client` 
    
2.  Install dependencies:
    
    bash
    
    Copy code
    
    `npm install` 
    
3.  Start the development server:
    
    bash
    
    Copy code
    
    `npm run dev` 
    

----------

## 📄 Usage

1.  Start the backend server:
    
    bash
    
    Copy code
    
    `cd server && npm run start` 
    
2.  Start the frontend:
    
    bash
    
    Copy code
    
    `cd client && npm run dev` 
    
3.  Open your browser and navigate to:
    
    text
    
    Copy code
    
    `http://localhost:5173` 
    

----------

## 📊 Features Overview

-   **📧 Real-Time Messaging**: Powered by **Socket.IO** for instant communication.
-   **🎥 Audio/Video Calling**: Integrated with **WebRTC** for seamless media communication.
-   **📊 User Statistics**: Insights into user activity and engagement.

----------

## ✨ Future Enhancements

-   🌐 Multi-language support.
-   🧩 Integration with other APIs for media sharing.
-   🚀 Deployment to production using cloud services like AWS or Vercel.
