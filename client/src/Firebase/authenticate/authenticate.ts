import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userAuthenticated, invalidCredentials } from "../../states/userSlice";

export function authenticate(email: string, password: string) {
  return async function authenticateThunk(dispatch: any) {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        dispatch(userAuthenticated(result.user.email!));
      })
      .catch(error => {
        dispatch(invalidCredentials());
      });
  }
}
