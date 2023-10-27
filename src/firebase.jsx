// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI8Y94MRMERX-iOaWfMwhCYod0jb3g1qQ",
  authDomain: "dormchat-d9744.firebaseapp.com",
  databaseURL: "https://dormchat-d9744-default-rtdb.firebaseio.com",
  projectId: "dormchat-d9744",
  storageBucket: "dormchat-d9744.appspot.com",
  messagingSenderId: "934565244385",
  appId: "1:934565244385:web:765f96048b65b3794536a0",
  measurementId: "G-EP51NY5JBK"
};

let app;
// Initialize Firebase
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}else {
  app = app(); // if already initialized, use that one
}

export default app;
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();