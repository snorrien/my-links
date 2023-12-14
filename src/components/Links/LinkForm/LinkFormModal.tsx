import { ChangeEvent, useState } from "react";
import "./LinkFormModal.css";
import { updateLink } from "../../../Firebase/Link/updateLink";
import Modal from "../../Shared/Modal/Modal";
import { LinkType } from "../../../Models/LinkType";

type Props = {
    card: LinkType;
    isOpen: boolean,
    closeModal: any;
}

const LinkFormModal: React.FC<Props> = ({ card, isOpen, closeModal }) => {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
        setTitle(event.target.value)
    }

    function handleLinkChange(event: ChangeEvent<HTMLInputElement>): void {
        setDescription(event.target.value);
    }
    
    async function handleModalClose() {
        await updateLink({
            id: card!.id,
            title: title!,
            description: description!,
            folderId: card.folderId
        });

        closeModal();
    }

    return (
        <Modal title="Card" isOpen={isOpen} onClose={handleModalClose}>
            <div className='cardForm'>
                <div className='cardForm__text' >
                    <label>Title</label>
                    <input className='cardForm__input' required value={title} onChange={handleTitleChange} placeholder="Title" />
                </div>
                <div className='cardForm__text'>
                    <label>Link</label>
                    <input className='cardForm__input' required value={description} onChange={handleLinkChange} placeholder="http//..." />
                </div>
            </div>
        </Modal>
    );
}

export default LinkFormModal;