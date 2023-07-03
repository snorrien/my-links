import { useEffect } from "react";
import "./MainPage.css";

import { Application } from '@splinetool/runtime';

function MainPage() {

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
                            <a href="#" className="home__button">
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
            </div>
    );
}

export default MainPage;