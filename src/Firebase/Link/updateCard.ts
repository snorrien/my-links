import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UpdateCardModel } from "../../Models/CardModel";


export async function updateCard(card: UpdateCardModel) {
    const linkRef = doc(db, "cards", card.id);

    await updateDoc(linkRef, {
        title: card.title,
        description: card.description
    });
}
