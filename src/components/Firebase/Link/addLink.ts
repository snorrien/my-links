import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export async function addLink() {
    await addDoc(collection(db, "cards"), {
      id: generateFirebaseId(10),
      title: 'New title',
      description: "https://bla.bla.bla..."
    });
}



function generateFirebaseId(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
