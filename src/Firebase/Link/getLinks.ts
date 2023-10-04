import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { CardModel } from "../../Models/CardModel";
import { getAuth } from "firebase/auth";

export async function getLinks(search?: string, sorting: string = "createDate"): Promise<CardModel[]> {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
        return [];
    }

    const cardsRef = collection(db, "cards");

    let getCardsQuery = query(cardsRef, where("userId", "in", [userId]), orderBy(sorting));
    
    if (search) {
        getCardsQuery = query(cardsRef, where("title", "in", [search]), where("userId", "in", [userId]), orderBy(sorting));
    }

    const querySnapshot = await getDocs(getCardsQuery);

    const cards: CardModel[] = [];
    querySnapshot.forEach((doc) => {
        cards.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            createDate: doc.data().createDate
        });
    });
    return cards;
}