import { useState } from "react";
import Input from "../Shared/Input/Input";
import "./ContactPage.css";
import Button from "../Shared/Button/Button";
import Dropdown from "../Shared/Dropdown/Dropdown";
import Textarea from "../Shared/Textarea/Textarea";
const ContactPage = () => {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<string | undefined>(undefined);

    return (
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
}

export default ContactPage;