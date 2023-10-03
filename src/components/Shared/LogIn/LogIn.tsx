import "./LogIn.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useState } from "react";
import { logIn } from "../../../Firebase/Authentication/logIn";

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [validationResult, setValidationResult] = useState('');

    async function handleRegisterClick() {
        validateInputs();
        await logIn(email, password);
        getUserData();
    };

    function getUserData(){

    }

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
                <Input
                    label='Email' 
                    placeholder="Email"
                    value={email}
                    handleChange={(e: any) => setEmail(e.target.value)}></Input>
                <Input
                    className ={emailError ? 'invalid-email' : ''} 
                    label='Password'
                    placeholder="Password"
                    value={password}
                    handleChange={(e: any) => setPassword(e.target.value)}
                    
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
                <Button text='Login' onClick={validateInputs} />

            </div>

        </div >
    );
}

export default LogIn;