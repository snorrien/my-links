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
            <section className="banner">
                <div className="banner__container">
                    <div className="banner__data">
                        <span className="banner__subtitle">My Links</span>
                        <h1 className="banner__title">Hey Buddy</h1>
                        <p className="banner__description">
                            Looks like you want to save some links <br /> right?
                        </p>
                        <a href="#about" className="banner__button" >
                            Continue
                        </a>
                    </div>
                    <div className="banner__img">
                        <img src="imgs/ghost.png" />
                        <div className="banner__shadow"></div>
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
                    <div className="about__title">
                        <h1 className="about__title__title">About platform</h1>
                        <p className="about__title__subtitle">MYLINKS is the ultimate online platform for effortlessly saving and organizing all
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
                                    <p className="description-text">It's absolutely free. Use it for your personally needs.</p>
                                    <img className="description-image" src="imgs/playing.png" />
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
                                    <p className="description-text">No more worrying about losing your links. Say goodbye to cluttered browser
                                        bookmarks and scattered links across multiple devices. </p>
                                    <img className="description-image" src="imgs/stay-home.png" />
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
                                    <p className="description-text">Organize and categorize web links with just a few clicks.
                                        Assign tags and descriptions to links for enhanced searchability.</p>
                                    <img className="description-image" src="imgs/reading.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className="contact">
                <h1 className="contact__title__title">Contact us</h1>
                <div className="contact__color-container"></div>
                <div className="contact__black-container"></div>
                <div className="circle-back circle-1"></div>
                <div className="circle-front"></div>
                <div className="circle-back circle-2"></div>
                <div className="contact__container">
                    <div className="contact__text">
                        <div>
                            <p className="contact__title">Problems</p>
                            <p>If you find any problems in using site, please write us your message.</p>
                        </div>
                        <div>
                            <p className="contact__title">Ideas and Suggestions</p>
                            <p>We open to suggestions. Let`s invent and create something new togeher </p>
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
                        <Textarea />
                        <Button text={"Send"} onClick={undefined} />
                    </div>
                </div>
            </section>
        </div >
    );
}

export default MainPage;