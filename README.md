📱 WhatsApp Clone

🌟 Project Overview
This WhatsApp Clone is a modern messaging platform built with Vite for the frontend and Node.js for the backend. It supports real-time messaging, audio/video calls, and user statistics, making it a robust communication tool.

🚀 Features
📧 Real-time messaging powered by Socket.IO.
🎥 Audio and video calling capabilities.
📊 User statistics to track interactions and engagement.
💾 Persistent data storage using MongoDB.
🎨 Stylish and responsive UI with Tailwind CSS.



🛠️ Tech Stack
        Frontend
        Framework: Vite
        Styling: Tailwind CSS
        State Management: Optional library (add details if used).
Backend
        Runtime: Node.js
        Framework: Express
        WebSockets: Socket.IO
        Database: MongoDB


📦 Installation
Clone the Repository
```git clone https://github.com/yourusername/whatsapp-clone.git```
```cd whatsapp-clone ```


Backend Setup
Navigate to the server directory:


Copy code
```cd server``
Install dependencies:

Copy code
```npm install```
Configure environment variables:
Create a .env file with the following:

env
Copy code
   ``` PORT=5000  ```
   ``` MONGO_URI=your_mongodb_connection_string  ```
   ``` JWT_SECRET=your_jwt_secret  ```
   ``` SOCKET_PORT=3000 ```
Start the backend server:

bash
Copy code
```npm run start```

Frontend Setup
Navigate to the client directory:

bash
Copy code
```cd client```
Install dependencies:

bash
Copy code
```npm install```
Start the development server:

bash
Copy code
```npm run dev``
📄 Usage
Start the backend server:

bash
Copy code
```cd server && npm run start```
Start the frontend:

bash
Copy code
```cd client && npm run dev```
Open your browser and navigate to the frontend development server URL (e.g., http://localhost:5173).

📊 Features Overview
      Real-Time Messaging
      Built with Socket.IO, enabling instant communication between users.
      Audio/Video Calling
      Integrates WebRTC for seamless media communication.
      User Statistics
      Provides insights into user activity and engagement.


✨ Future Enhancements
    🌐 Multi-language support.
    🧩 Integration with other APIs for media sharing.
    🚀 Deployment to production using cloud services like AWS or Vercel.

