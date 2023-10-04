import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function login(email: string, password: string) {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log(result.user.uid);
      
    })
    .catch((error) => {
      console.log(error.message);
    });
}
