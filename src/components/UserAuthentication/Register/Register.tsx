import "./Register.css";
import Button from "../../Shared/Button/Button";
import Input from "../../Shared/Input/Input";
import { useState } from "react";
import { register } from "../../../Firebase/authenticate/register";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

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

    function validateInputs() {
        setEmailError(isEmailValid(email));
        setPasswordError(isPasswordValid(password));
    }

    async function handleRegisterClick() {
        validateInputs();
        await register(email, password);
        navigate("/link");
    };

    return (
        <div>
            <div className='cardForm'>
                <Input
                    label='Email'
                    placeholder="Email"
                    onChange={setEmail}
                    error={emailError}
                />
                <Input
                    label='Password'
                    placeholder="Password"
                    onChange={setPassword}
                    error={passwordError}
                />
                <Input
                    label='Confirm Password'
                    placeholder="Confirm Password"
                    onChange={setPassword}
                />
            </div>
            <div className="register_btn">
                <Button text='Register' onClick={handleRegisterClick} />
            </div>
        </div>
    );
}

export default Register;