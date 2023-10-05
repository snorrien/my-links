import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { login } from "../../states/userSlice";

export async function authenticate(email: string, password: string) {


  const dispatch = useAppDispatch()
  
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      console.log(result.user.uid);
      dispatch(login(result.user.email!))
    })
    .catch((error) => {
      console.log(error.message);
    });
}
