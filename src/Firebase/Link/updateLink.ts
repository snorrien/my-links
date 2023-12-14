import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UpdateLinkModel } from "../../Models/LinkType";


export async function updateLink(link: UpdateLinkModel) {
    const linkRef = doc(db, "cards", link.id);

    await updateDoc(linkRef, {
        title: link.title,
        description: link.description,
        folderId: link.folderId
    });
}
