import "./ConfirmationDialog.css";
import Modal from "../../Library/Modal/Modal";
import Button from "../Buttons/Button";

type Props = {
    isOpen: boolean,
    closeModal: any;
}

const ConfirmationDialog: React.FC<Props> = ({ isOpen, closeModal }) => {

    async function handleModalClose() {

        closeModal();
    }


    return (
        <Modal title="Are you sure?" isOpen={isOpen} onClose={handleModalClose}>
            <div>Do you want to delete the Card?</div>
            <div className="confirm-dialog__buttons">
                <Button text='No' />
                <Button text='Yes' />
            </div>
        </Modal >
    );
}

export default ConfirmationDialog;