// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZbWdpfyfyU0xD4c_uuqRjM0F9s40xCCU",
  authDomain: "user-email-password-73aa5.firebaseapp.com",
  projectId: "user-email-password-73aa5",
  storageBucket: "user-email-password-73aa5.appspot.com",
  messagingSenderId: "52007186355",
  appId: "1:52007186355:web:dae8bfbadeeebbec91a5c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export default app;
// eslint-disable-next-line no-unused-vars
const auth = getAuth(app);
export default auth;