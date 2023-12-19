import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteFolderAsync(id: string) {
    await deleteDoc(doc(db, "folders", id));
}
