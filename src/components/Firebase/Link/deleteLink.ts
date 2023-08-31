// Add a second document with a generated ID.
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteLink(id: string) {
    await deleteDoc(doc(db, "cards", id));
}
