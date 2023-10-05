import { authenticate } from "../Firebase/Authentication/authenticate"
import { ILogin, LoginAction } from "./LoginAction";
import * as actionTypes from "./actionTypes"

export async function login(login: ILogin) {
  return async (dispatch: any) => {
    const action: LoginAction = {
      type: actionTypes.LOGIN,
      login: login,
    }


    await authenticate(action.login.email, action.login.password);

    dispatch(action.type);
  }
}