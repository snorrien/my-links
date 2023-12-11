import { useEffect, useState } from "react";
import "./Navigation.css";
import Modal from "../Shared/Modal/Modal";
import Register from "../Shared/Register/Register";
import Button from "../Shared/Button/Button";
import { ModalState } from "./ModalState";
import Login from "../Shared/Login/LogIn";
import { userSignOut } from "../../Firebase/authenticate/signOut";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Navigation: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isSignOut, setIsSignOut] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(ModalState.Login);
  const navigate = useNavigate();

  useEffect(() => {
    getAuth().onAuthStateChanged(() => {
      if (getAuth().currentUser) {
        setIsOpen(false)
        setIsSignOut(true)
      }
    })

  }, [getAuth().currentUser]);

  function handleLoginClick() {
    setIsOpen(true)
    setModalState(ModalState.Login)
  }

  function handleRegisterClick() {
    setIsOpen(true)
    setModalState(ModalState.Register)
  }

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

  function handleSignOutClick() {
    userSignOut();
    navigate("/");
    setIsSignOut(false)
  }

  return (
    <div className="navigation">
      <nav className="navigation__container">
        <a href="/" className="navigation__logo">
          MYLINKS
        </a>
        <div className="navigation__list">
          {!isSignOut ?
            (
              <div className="navigation__list">
                <button className='white-button navigation__button' onClick={() => handleLoginClick()}>Log in</button>
                <button className='navigation__button' onClick={() => handleRegisterClick()}>Sign up</button>
              </div>
            ) :
            (
              <button className='navigation__button' onClick={() => handleSignOutClick()}>Sign out</button>
            )
          }

        </div>
      </nav>
      <Modal title={getModalTitle()} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalState === ModalState.Login && (
          <div>
            <Login />
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
  )
};

export default Navigation;