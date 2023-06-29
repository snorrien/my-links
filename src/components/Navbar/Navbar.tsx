import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav className="nav container">
      <a href="/" className="nav__logo">
        MYLINKS
      </a>
      <div className="nav__menu" id="nav-menu">
        <ul className="nav__list">
          <li className="nav__item">
            <a href="/card" className="nav__link">Card</a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">About</a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">Contact</a>
          </li>
        </ul>

        <div className="nav__close" id="nav-close">
        <i className="ri-close-line"></i>
        </div>
      </div>

      <div className="nav__toggle" id="nav-toggle">
      <i className="ri-menu-line"></i>
      </div>
    </nav>
  )
};

export default Navbar;