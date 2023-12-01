import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteFolder(id: string) {
    await deleteDoc(doc(db, "folders", id));
}
