import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

// Http requests to backend (http://localhost:3000) instead
export async function addLink() { 
  
    // await addDoc(collection(db, "cards"), {
    //   id: generateFirebaseId(10),
    //   title: 'New title',
    //   description: "https://bla.bla.bla...",
    //   userId: getAuth().currentUser?.uid,
    //   createDate: new Date()
    // });
}

function generateFirebaseId(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}