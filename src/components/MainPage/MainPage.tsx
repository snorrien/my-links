import "./MainPage.css";
import { useState } from "react";
import GameMap from "../Game/GameMap";
import Modal from "../Shared/Modal/Modal";
import Register from "../Shared/Register/Register";
import Button from "../Shared/Button/Button";
import { ModalState } from "./ModalState";
import Login from "../Shared/Login/Login";

const MainPage: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalState, setModalState] = useState<ModalState>(ModalState.Login);

    function getModalTitle() {
        switch (modalState) {
            case ModalState.Login:
                return 'Login';
            case ModalState.Register:
                return 'Register';
            case ModalState.ConfirmRegister:
                return 'Regestration Completed!';
        }
    }

    return (
        <div className="main-page">
            <section className="home">
                <div className="home__container">
                    <div className="home__data">
                        <span className="home__subtitle">My Links</span>
                        <h1 className="home__title">Hey Buddy</h1>
                        <p className="home__description">
                            Looks like you want to save some links <br /> right?
                        </p>
                        <a href="#" className="home__button" onClick={() => setIsOpen(true)}>
                            Continue
                        </a>
                    </div>

                    <div className="home__img">
                        <img src="imgs/ghost.png" alt="" />
                        <div className="home__shadow"></div>
                    </div>
                </div>
                <footer className="home__footer">
                    <span>(554) 987-654</span>
                    <span>|</span>
                    <span>info@company.com</span>
                </footer>
            </section>

            <Modal title={getModalTitle()} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {modalState === ModalState.Login && (
                    <div>
                        <Login  />
                        <p className="login__toggle">
                            Don't have an account?
                            <a className="toggle_link" href="#" onClick={() => setModalState(ModalState.Register)}>Register</a>
                        </p>
                    </div>
                )}
                {modalState === ModalState.Register && (
                    <div>
                        <Register backToLogin={() => setModalState(ModalState.ConfirmRegister)} />
                        <p className="login__toggle">
                            Already have an account?
                            <a className="toggle_link" href="#" onClick={() => setModalState(ModalState.Login)}>LogIn</a>
                        </p>
                    </div>
                )}
                {modalState === ModalState.ConfirmRegister && (
                    <div>
                        <div>You are registred</div>
                        <Button text='Back to Login' onClick={() => setModalState(ModalState.Login)} />
                    </div>
                )}

            </Modal>
        </div>
    );
}

export default MainPage;