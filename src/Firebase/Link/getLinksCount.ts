import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

export async function getLinksCount(folderId?: string): Promise<number> {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
        return 0;
    }

    const cardsRef = collection(db, "cards");

    let getCardsQuery = query(cardsRef, where("userId", "in", [userId]),  where("folderId", "in", [folderId]));
    
    const querySnapshot = await getDocs(getCardsQuery);

    let count = 0;

    querySnapshot.forEach((doc) => {
        count++;
    });
    
    return count;
}