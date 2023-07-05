import "./Modal.css";

type Props = {
    isOpen: boolean;
    onClose: any;
    title: string;
    children: any;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h1 className="modal__title">{title}</h1>
                {children}
            </div>
        </div>
    );
}

export default Modal;