import "./ConfirmationDialog.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

type Props = {
    isOpen: boolean,
    closeDialog: (result: boolean) => Promise<void>,
    message: string
}

const ConfirmationDialog: React.FC<Props> = ({ isOpen, closeDialog, message }) => {

    async function handleModalClose() {
        closeDialog(false);
    }

    async function handleResult(result: boolean) {
        await closeDialog(result);
    }

    return (
        <Modal title="Are you sure?" isOpen={isOpen} onClose={handleModalClose}>
            <div className="confirm-dialog__text">{message}</div>
            <div className="confirm-dialog__buttons">
                <Button text='Yes' onClick={async () => await handleResult(true)} />
                <Button text='No' onClick={async () => await handleResult(false)} />
            </div>
        </Modal >
    );
}

export default ConfirmationDialog;