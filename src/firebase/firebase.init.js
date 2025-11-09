// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5DSlW2MyqsjDCkl-fWitIzPmzdXhCv7M",
  authDomain: "travel-ease-33e8b.firebaseapp.com",
  projectId: "travel-ease-33e8b",
  storageBucket: "travel-ease-33e8b.firebasestorage.app",
  messagingSenderId: "349982068819",
  appId: "1:349982068819:web:056f7cd9f8955bc926b6a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);