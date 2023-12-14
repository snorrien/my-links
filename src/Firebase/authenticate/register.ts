import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export async function register(email: string, password: string) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
        })
        .catch((error) => {
        });
}