import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import { CardModel } from "../../Models/CardModel"; 

export async function getLinks(): Promise<CardModel[]> {
    const querySnapshot = await getDocs(collection(db, "cards"));
    const cards: CardModel[] = [];

    querySnapshot.forEach((doc) => {
        cards.push({
            id: doc.id,
            title: doc.data().title,
        });
    });
    console.log(cards)
    return cards;
}

