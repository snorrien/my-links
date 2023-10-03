import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBs2u_LOQH6iJTlbdyluT3EklQggFcMh9c",
  authDomain: "mylinks-2dbeb.firebaseapp.com",
  projectId: "mylinks-2dbeb",
  storageBucket: "mylinks-2dbeb.appspot.com",
  messagingSenderId: "104547746485",
  appId: "1:104547746485:web:77e00dbb8f5857ea4bb4fc",
  measurementId: "G-7VC2W67H2J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getFirestore(app);