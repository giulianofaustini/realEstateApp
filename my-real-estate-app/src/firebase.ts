// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestateweb-24c2c.firebaseapp.com",
  projectId: "realestateweb-24c2c",
  storageBucket: "realestateweb-24c2c.appspot.com",
  messagingSenderId: "651348325758",
  appId: "1:651348325758:web:e6d210906fa7eb0cb9af2f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

