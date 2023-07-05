import "./MainPage.css";
import Auth from "../Auth/Auth";
import { useState } from "react";

function MainPage() {
    const [isOpen, setIsOpen] = useState(false);
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
                        {isOpen && <Auth setIsOpen={setIsOpen} />}
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
        </div>
    );
}

export default MainPage;