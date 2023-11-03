import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export async function addFolder() {
    await addDoc(collection(db, "folders"), {
        id: generateFirebaseId(10),
        title: 'New title',
        userId: getAuth().currentUser?.uid
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