import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteLinkAsync(id: string) {
    await deleteDoc(doc(db, "cards", id));
}
