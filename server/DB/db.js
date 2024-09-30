import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const connection = async () => {
    const url = process.env.DB_URL;
    // const url="mongodb://localhost:27017/whatsappclone"

    if (!url) {
        console.error("DB_URL is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(url)
        console.log("DB is Connected");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
};
