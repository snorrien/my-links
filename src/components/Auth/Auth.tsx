import Modal from "../Modal/Modal";
import "./Auth.css";

interface ModalProps {
    setIsOpen: (isOpen: boolean) => void;
}

const Auth: React.FC<ModalProps> = ({ setIsOpen }) => {
    return (
        <Modal title="Login">
            <div className="modal-outer" onClick={() => setIsOpen(false)}>
            <div className="auth" onClick={e => e.stopPropagation()}>
                <form className="login__form">

                    <div className="login__content">
                        <div className="login__box">
                            <div className="login__box-input">
                                <input type="email" required className="email__input" placeholder=" " />
                                <span></span>
                                <label>Email</label>
                            </div>
                        </div>
                        <div className="login__box">
                            <div className="login__box-input">
                                <input type="password" required className="password__input" id="login-pass" placeholder=" " />
                                <span></span>
                                <label>Password</label>
                            </div>
                        </div>
                    </div>

                    <div className="login__check">
                        <div className="login__check-group">
                            <input type="checkbox" className="login__check-input" />
                            <label className="login__check-label">Remember me</label>
                        </div>
                        <a href="#" className="login__forgot">Forgot Password?</a>
                    </div>

                    <button type="submit" className="login__button">Login</button>

                    <p className="login__register">
                        Don't have an account? <a href="#">Register</a>
                    </p>
                </form>
            </div>
        </div>
        </Modal>
        
    );
}

export default Auth;