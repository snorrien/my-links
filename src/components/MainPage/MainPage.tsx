import "./MainPage.css";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import Dropdown from "../Shared/Dropdown/Dropdown";
import Textarea from "../Shared/Textarea/Textarea";
import { useState } from "react";

const MainPage = () => {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<string | undefined>(undefined);
    
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
                        <a href="#about" className="home__button" >
                            Continue
                        </a>
                    </div>

                    <div className="home__img">
                        <img src="imgs/ghost.png" />
                        <div className="home__shadow"></div>
                    </div>
                </div>
            </section>
            <section className="about" id='about'>
                <div className="about__container" >
                    <div className="about__list">
                        <div className="about__list-scroll" >
                            <div className="about__list-li">
                                <p>save</p>
                                <p>EASY</p>
                                <p>FREE</p>
                                <p>FUNNY</p>
                                <p>QUICK</p>
                                <p>allow</p>
                                <p>save</p>
                                <p>EASY</p>
                                <p>FREE</p>
                                <p>FUNNY</p>
                                <p>QUICK</p>
                                <p>allow</p>
                            </div>
                        </div>
                    </div>
                    <div className="about__name">
                        <h1 className="about__title">About platform</h1>
                        <p className="about__subtitle">MyLink is the ultimate online platform for effortlessly saving and organizing all
                            your favorite web links in one convenient place. </p>
                    </div>
                    <div className="about__description">
                        <div className="description-element">
                            <div className="description-inner">
                                <div className="description-front">
                                    <p className="description-title">Free</p>
                                </div>
                                <div className="description-back">
                                    <p className="description-title">Free</p>
                                    <p>It's absolutely free. Use it for your personally needs.</p>
                                </div>
                            </div>
                        </div>
                        <div className="description-element">
                            <div className="description-inner">
                                <div className="description-front">
                                    <p className="description-title">Save</p>
                                </div>
                                <div className="description-back">
                                    <p className="description-title">Save</p>
                                    <p>No more worrying about losing your links. Say goodbye to cluttered browser
                                         bookmarks and scattered links across multiple devices. </p>
                                </div>
                            </div>
                        </div>
                        <div className="description-element">
                            <div className="description-inner">
                                <div className="description-front">
                                    <p className="description-title">Organize</p>
                                </div>
                                <div className="description-back">
                                    <p className="description-title"> Organize</p>
                                    <p>Organize and categorize web links with just a few clicks.
                                        Assign tags and descriptions to links for enhanced searchability.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section >
            <section className="contact">
            <div className="contact-page">
            <div className="contact__data">
                <div>
                    <p className="contact__title">Problems</p>
                    <p>If you find any problems in using site, please write me your message.
                        It needs for making my sitee better and your using nore confortable</p>
                </div>
                <div>
                    <p className="contact__title">Ideas and Suggestions</p>
                    <p>I open to suggestions. Let`s invent and create something new togeher </p>
                </div>
            </div>
            <div className="contact__form">
                <Input
                    label='Name'
                    placeholder="Name"
                    onChange={setName}
                    error={nameError}
                    type="name"
                    autoComplete="username"
                />
                <Dropdown items={["Problems", "Ideas and Suggestions"]} />

               <Textarea/>
                <Button text={"Send"} onClick={undefined} />

            </div >

        </div >
    )
            </section>

        </div >
    );
}

export default MainPage;