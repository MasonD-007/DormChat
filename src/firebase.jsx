// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI8Y94MRMERX-iOaWfMwhCYod0jb3g1qQ",
  authDomain: "dormchat-d9744.firebaseapp.com",
  projectId: "dormchat-d9744",
  storageBucket: "dormchat-d9744.appspot.com",
  messagingSenderId: "934565244385",
  appId: "1:934565244385:web:765f96048b65b3794536a0",
  measurementId: "G-EP51NY5JBK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();