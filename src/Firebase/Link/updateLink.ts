import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UpdateLinkModel } from "../../Models/LinkModel";


export async function updateLink(link: UpdateLinkModel) {
    const linkRef = doc(db, "cards", link.id);

    console.log(link)

    await updateDoc(linkRef, {
        title: link.title,
        description: link.description,
        folderId: link.folderId
    });

}
