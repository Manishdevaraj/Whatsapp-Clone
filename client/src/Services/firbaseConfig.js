// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3U06K0lsulilHXrRFAGeMUt-oV-Hf65U",
  authDomain: "whatsapp-clone-42627.firebaseapp.com",
  projectId: "whatsapp-clone-42627",
  storageBucket: "whatsapp-clone-42627.appspot.com",
  messagingSenderId: "861435875576",
  appId: "1:861435875576:web:898bba5b277d55bab9ab0d",
  measurementId: "G-64P32JKM3C"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const storage = getStorage(app);