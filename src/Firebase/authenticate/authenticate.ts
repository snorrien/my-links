import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { userAuthenticated } from "../../states/userSlice";

export function authenticate(email: string, password: string) {
  return async function authenticateThunk(dispatch: any) {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    
    dispatch(userAuthenticated(response.user.email!));
  }
}