
export interface ILogin {
    email: string,
    password: string
}

export type LoginAction = {
    type: string
    login: ILogin
}

export type DispatchType = (args: LoginAction) => LoginAction