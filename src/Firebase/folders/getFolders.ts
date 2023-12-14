import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FolderType } from "../../Models/FolderType";
import { getAuth } from "firebase/auth";
import { getLinksCount } from "../Link/getLinksCount";

export async function getFolders() {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
        return [];
    }

    const foldersRef = collection(db, "folders");
    let getFoldersQuery = query(foldersRef, where("userId", "in", [userId]));
    const querySnapshot = await getDocs(getFoldersQuery);

    const promises = querySnapshot.docs.map(async (doc) => {
        const folder = {
            id: doc.id,
            title: doc.data().title,
            linksCount: await getLinksCount(doc.id)
        };
        return folder;
    });

    return await Promise.all(promises);
}