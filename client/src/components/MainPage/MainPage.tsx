import "./MainPage.css";
const MainPage = () => {

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
                        <a href="#" className="home__button" >
                            Continue
                        </a>
                    </div>

                    <div className="home__img">
                        <img src="imgs/ghost.png" alt="" />
                        <div className="home__shadow"></div>
                    </div>
                </div>
            </section>
            <section className="about">
                <div className="about__container">
                    <div className="about__name">
                        <h1 className="about__title">About platform</h1>
                        <p className="about__subtitle">MyLink is the ultimate online platform for effortlessly saving and organizing all
                            your favorite web links in one convenient place. </p>
                    </div>
                    <div className="about__description">
                        <div className="description-element">
                            <p className="description-title">Save</p>
                            <p>Say goodbye to cluttered browser
                                bookmarks and scattered links across multiple devices. No more worrying about losing your links when switching devices.</p>
                        </div>
                        <div className="description-element">
                            <p className="description-title"> Organize</p>
                            <p>Organize and categorize web links with just a few clicks.
                                Intuitive interface for quick and easy link entry and retrieval.
                                Assign tags and descriptions to links for enhanced searchability.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default MainPage;