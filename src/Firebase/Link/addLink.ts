import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export async function saveLink(folderId?: string) {
  await addDoc(collection(db, "cards"), {
    id: generateFirebaseId(10),
    title: 'New title',
    description: 'www.example.com',
    userId: getAuth().currentUser?.uid,
    createDate: Timestamp.fromDate(new Date()),
    folderId: folderId ?? ''
  });
}

function generateFirebaseId(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}