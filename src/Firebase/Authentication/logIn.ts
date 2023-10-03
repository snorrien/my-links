import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function logIn(email: string, password: string) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.log(error.message);
      });   
}
