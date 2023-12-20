import "./Login.css";
import Button from "../../Shared/Button/Button";
import Input from "../../Shared/Input/Input";
import { useState } from "react";
import { authenticate } from "../../../Firebase/authenticate/authenticate";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    const [userIsUndefind, setUserIsUndefind] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    async function handleLoginClick() {
        const emailError = isEmailValid(email);
        const passwordError = isPasswordValid(password);

        if (emailError || passwordError) {
            setEmailError(emailError);
            setPasswordError(passwordError);
        } else {
            // use saga
            await authenticate(email, password);
            if (auth.currentUser) {
                setUserIsUndefind(false);
                navigate("/link");
            } else {
                setUserIsUndefind(true)
            }
        }
    };

    function isEmailValid(value: string) {
        if (!/^[\w\.-]+@[\w\.-]+$/.test(value)) {
            return 'Invalid email';
        }
    }

    function isPasswordValid(value: string) {
        if (value.length < 6) {
            return 'Invalid password';
        }
    }

    return (
        <div>
            <div className='cardForm'>
                <Input
                    label='Email'
                    placeholder="Email"
                    onChange={setEmail}
                    error={emailError}
                    type="email"
                    autoComplete="username"
                ></Input>
                <Input
                    label='Password'
                    placeholder="Password"
                    onChange={setPassword}
                    error={passwordError}
                    type="password"
                    autoComplete="current-password"
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
                <div className={`login__bottom__userIsUndefind ${!userIsUndefind ? 'hide' : ''}`}>
                    <p>There is <b>NO USER</b><br />with this username and password </p>
                </div>
                <Button text='Login' onClick={handleLoginClick} />
            </div>
        </div>
    );
}

export default Login;