import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

var serviceAccount = JSON.parse(process.env.Firebase_Credentials);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const deleteStatusFb = async (path) => {
  try
  {
    const bucket = admin.storage().bucket();
    const file = bucket.file(path);
    await file.delete();
  }
  catch(err)
  {
    console.log(err);
  }
};
