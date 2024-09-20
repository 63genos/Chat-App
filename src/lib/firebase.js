
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: AIzaSyA7dE1WMwysuY3aeRzuRWYdDBPsFkaAHRk,
  authDomain: "chatapp-9a4e4.firebaseapp.com",
  projectId: "chatapp-9a4e4",
  storageBucket: "chatapp-9a4e4.appspot.com",
  messagingSenderId: "244396944028",
  appId: "1:244396944028:web:da427a7868dd48ca755b59"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()