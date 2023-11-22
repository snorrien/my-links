import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FolderModel } from "../../Models/FolderModel";
import { getAuth } from "firebase/auth";

export async function getFolders() {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
        return [];
    }

    const foldersRef = collection(db, "folders");
    let getFoldersQuery = query(foldersRef, where("userId", "in", [userId]));
    const querySnapshot = await getDocs(getFoldersQuery);

    const folders: FolderModel[] = [];
    querySnapshot.forEach((doc) => {
        folders.push({
            id: doc.id,
            title: doc.data().title,
        });
    });
    return folders;
}