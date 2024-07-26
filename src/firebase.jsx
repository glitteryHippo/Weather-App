// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHIiKIaY0-G7rwISyjkQelYit8BwLxyTQ",
  authDomain: "react-9718f.firebaseapp.com",
  projectId: "react-9718f",
  storageBucket: "react-9718f.appspot.com",
  messagingSenderId: "77835246984",
  appId: "1:77835246984:web:e259a3cc6df0f45984ae3d",
  measurementId: "G-892TFQKL23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;