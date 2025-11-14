import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-B5hgzOOwO6yrEmJWzw5UXClo25OZxf0",
  authDomain: "usersstore-412f9.firebaseapp.com",
  projectId: "usersstore-412f9",
  storageBucket: "usersstore-412f9.firebasestorage.app",
  messagingSenderId: "506928950041",
  appId: "1:506928950041:web:daf29d5165937125a07388",
  measurementId: "G-ZDXXD705C0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
