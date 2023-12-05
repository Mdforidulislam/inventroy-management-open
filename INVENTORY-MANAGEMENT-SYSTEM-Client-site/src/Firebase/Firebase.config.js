// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUe1Ud0gyuLOBMtI6iSchHGrRTk2WqIo4",
  authDomain: "staring-project-891fb.firebaseapp.com",
  projectId: "staring-project-891fb",
  storageBucket: "staring-project-891fb.appspot.com",
  messagingSenderId: "684224727559",
  appId: "1:684224727559:web:0ff17f4fd1da15b1af38a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)