import "./Register.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useState } from "react";
import { register } from "../../../Firebase/Authentication/register";

type Props = {
    backToLogin: any;
};

function Register({ backToLogin }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [validationResult, setValidationResult] = useState('');

    async function handleRegisterClick() {
        validateInputs();
        await register(email, password);
        backToLogin();
    };

    function validateInputs() {
        const emailPattern = /^[\w\.-]+@[\w\.-]+$/;

        if (!email.match(emailPattern)) {
            setValidationResult('Invalid email');
        } else if (password.length < 6) {
            setValidationResult('Invalid password');
        } else {
            setValidationResult('Ok');
        }
    };

    return (
        <div>
            <div className='cardForm'>
                <Input label='Email' placeholder="Email" value={email} handleChange={(e: any) => setEmail(e.target.value)}></Input>
                <Input label='Password' placeholder="Password" value={password} handleChange={(e: any) => setPassword(e.target.value)}></Input>
                <Input label='Confirm Password' placeholder="Confirm Password" value={password} handleChange={(e: any) => setPassword(e.target.value)}></Input>
            </div>
            <div className="register_btn">
                <Button text='Register' onClick={handleRegisterClick} />
            </div>
        </div>
    );
}

export default Register;