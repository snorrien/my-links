import { ChangeEvent, useState } from "react";
import "./LinkFormModal.css";
import Modal from "../../Shared/Modal/Modal";
import { LinkType } from "../../../Models/LinkType";
import { useDispatch } from 'react-redux';
import { updateLink } from "../../../redux/actions/LinkActionCreator";
import Input from "../../Shared/Input/Input";

type Props = {
    card: LinkType;
    isOpen: boolean,
    closeModal: any;
}

// isOpen and closeModal will be removed
const LinkFormModal: React.FC<Props> = ({ card, isOpen, closeModal }) => {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const dispatch = useDispatch();

    function handleTitleChange(value: string): void {
        setTitle(value)
    }

    function handleLinkChange(event: ChangeEvent<HTMLInputElement>): void {
        setDescription(event.target.value);
    }

    async function handleModalClose() {
        dispatch(updateLink({
            id: card!.id,
            title: title!,
            description: description!,
            folderId: card.folderId
        }));
        closeModal(); // move this logic to updateLink action
    }

    // isOpen -> isLinkOpen (in RootState)
    return (
        <Modal title="Card" isOpen={isOpen} onClose={handleModalClose}>
            <div className='cardForm'>
                <div className='cardForm__text' >
                    <label>Title</label>
                    <Input  required value={title} onChange={handleTitleChange} placeholder="Title" />
                </div>
                <div className='cardForm__text'>
                    <label>Link</label>
                    <Input required value={description} onChange={handleLinkChange} placeholder="http//..." />
                </div>
            </div>
        </Modal>
    );
}

export default LinkFormModal;