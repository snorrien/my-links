import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { userAuthenticated, invalidCredentials } from "../../states/userSlice";
import axios from 'axios';

export function authenticate(email: string, password: string) {
  return async function authenticateThunk(dispatch: any) {
    // axios
    // .get('http://localhost:3000/login')
    // .then((response) => {
    //  console.log(response.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password);
    setPersistence(auth, browserSessionPersistence)
      .then(result => {
        dispatch(userAuthenticated(email));
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch(error => {
        dispatch(invalidCredentials());
      });
  }
}



