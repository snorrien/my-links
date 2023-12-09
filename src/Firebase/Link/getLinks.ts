import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { LinkModel } from "../../Models/LinkModel";
import { getAuth } from "firebase/auth";

export async function getLinks(search?: string, sorting: string = "createDate", folderId?: string): Promise<LinkModel[]> {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
        return [];
    }

    const cardsRef = collection(db, "cards");

    let getCardsQuery = query(cardsRef, where("userId", "in", [userId]), orderBy(sorting));
    
    if (search && !folderId!) {
        getCardsQuery = query(cardsRef, where("title", "in", [search]), where("userId", "in", [userId]), orderBy(sorting));
    }

    if (!search && folderId) {
        getCardsQuery = query(cardsRef, where("folderId", "in", [folderId]), where("userId", "in", [userId]), orderBy(sorting));
    }

    if (folderId && search) {
        getCardsQuery = query(cardsRef, where("title", "in", [search]), where("userId", "in", [userId]), where("folderId", "in", [folderId]), orderBy(sorting));
    }

    const querySnapshot = await getDocs(getCardsQuery);

    const cards: LinkModel[] = [];
    querySnapshot.forEach((doc) => {
        cards.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            createDate: doc.data().createDate,
            folderId: doc.data().folderId
        });
    });
    return cards;
}