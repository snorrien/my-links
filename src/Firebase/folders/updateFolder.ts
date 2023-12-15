import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UpdateFolderModel } from "../../Models/FolderType";


export async function updateFolder(folder: UpdateFolderModel) {
    const folderRef = doc(db, "folders", folder.id);

    await updateDoc(folderRef, {
        title: folder.title,
    });
}
