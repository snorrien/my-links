import "./Login.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useState } from "react";
import { authenticate } from "../../../Firebase/authenticate/authenticate";
import { selectUser } from "../../../states/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";

const Login = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    async function handleLoginClick() {
        validateInputs();

        dispatch(authenticate(email, password));

        console.log(user);

    };

    function isEmailValid(value: string) {
        if (!/^[\w\.-]+@[\w\.-]+$/.test(value)) {
            return 'Invalid email';
        } 
    }

    function isPasswordValid(value: string) {
        if (value.length < 6 ) {
            return 'Invalid password';
        }
    }

    function validateInputs() {
        setEmailError(isEmailValid(email));
        setPasswordError(isPasswordValid(password));
    }

    return (
        <div>
            <div className='cardForm'>
                <Input
                    label='Email'
                    placeholder="Email"
                    onChange={setEmail}
                    error={emailError}
                ></Input>
                <Input
                    label='Password'
                    placeholder="Password"
                    onChange={setPassword}
                    error={passwordError}
                ></Input>
            </div>
            <div className="login__bottom">
                <div className="login__info">
                    <div className="login__check-group">
                        <input type="checkbox" className="login__check-input" />
                        <label className="login__check-label">Remember me</label>
                    </div>
                    <a href="#" className="login__forgot">Forgot Password?</a>
                </div>
                <Button text='Login' onClick={handleLoginClick} />
            </div>
        </div>
    );
}

export default Login;