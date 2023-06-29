import "./Navbar.css";

const Navbar= () =>{
    <nav className="nav container">
        <a href="#" className="nav__logo">
            XCOMPANY
        </a>
        <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
                <li className="nav__item">
                    <a href="#" className="nav__link">Home</a>
                </li>
                <li className="nav__item">
                    <a href="#" className="nav__link">About</a>
                </li>
                <li className="nav__item">
                    <a href="#" className="nav__link">Contact</a>
                </li>
            </ul>

            <div className="nav__close" id="nav-close">
                <i className='bx bx-x'></i>
            </div>
        </div>

        <div className="nav__toggle" id="nav-toggle">
            <i className='bx bx-grid-alt'></i>
        </div>
    </nav>
}
export default Navbar;