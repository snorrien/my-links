import { useState } from "react";
import "./Navigation.css";
import Modal from "../Shared/Modal/Modal";
import Register from "../Shared/Register/Register";
import Button from "../Shared/Button/Button";
import { ModalState } from "./ModalState";
import Login from "../Shared/Login/LogIn";

const Navigation:React.FC = () =>  {

  const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(ModalState.Login);

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

  return (
    <div className="navigation">
      <nav className="navigation__container">
        <a href="/" className="navigation__logo">
          MYLINKS
        </a>
        <ul className="navigation__list">
          <li className="list-item">
            <a href="#" className="nav__link">Contact</a>
          </li>
          <li>
            <button className='white-button navigation__button' onClick={()=> handleLoginClick()} >Log in</button>
          </li>
          <li>
            <button className='navigation__button' onClick={()=> handleRegisterClick() }>Sign up</button>
          </li>
        </ul>
      </nav>
      <Modal title={getModalTitle()} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        { modalState === ModalState.Login && (
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