import { getAuth, signOut } from "firebase/auth";

export async function userSignOut() {
    const auth = getAuth();
    await signOut(auth)
        .then(() => {
      })
}