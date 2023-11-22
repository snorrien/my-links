import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UpdateLinkModel } from "../../Models/LinkModel";


export async function updateLink(card: UpdateLinkModel) {
    const linkRef = doc(db, "cards", card.id);

    await updateDoc(linkRef, {
        title: card.title,
        description: card.description
    });
}
