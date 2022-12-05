import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH5uMVpaDUxnAHeCW2LnRoVXnJZvI6ABw",
  authDomain: "relaxify-5802f.firebaseapp.com",
  projectId: "relaxify-5802f",
  storageBucket: "relaxify-5802f.appspot.com",
  messagingSenderId: "581581617022",
  appId: "1:581581617022:web:31d8822706edae06b1652f"
};

export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
