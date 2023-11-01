import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
export async function register(email: string, password: string) {
    const auth = getAuth();
    await signOut(auth)
        .then(() => {
            console.log('sign out')
      })
}