import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { LinkType } from "../../Models/LinkType";

export async function getLinks(): Promise<LinkType[]> {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
        return [];
    }

    const cardsRef = collection(db, "cards");
    const getCardsQuery = query(cardsRef, where("userId", "in", [userId]));
    const querySnapshot = await getDocs(getCardsQuery);

    const cards: LinkType[] = [];
    querySnapshot.forEach((doc) => {
        cards.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            createDate: doc.data().createDate.seconds,
            folderId: doc.data().folderId
        });
    });
    console.log(cards)
    return cards;
}