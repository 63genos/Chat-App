 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
 import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-8a352.firebaseapp.com",
  projectId: "reactchat-8a352",
  storageBucket: "reactchat-8a352.appspot.com",
  messagingSenderId: "843676121476",
  appId: "1:843676121476:web:b739a4d46c81c50043c5d1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
