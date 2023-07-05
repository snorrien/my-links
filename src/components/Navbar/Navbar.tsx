import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  function handleToggleMenu(event: any): void {
    event.stopPropagation()
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="navbar">
      <nav className="nav container">
        <a href="/" className="nav__logo">
          MYLINKS
        </a>
        <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`} ref={menuRef}>
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

          <div className="nav__close" id="nav-close" onClick={handleToggleMenu}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={handleToggleMenu}>
          <i className="ri-menu-line"></i>
        </div>
      </nav>
    </div>
  )
};

export default Navbar;