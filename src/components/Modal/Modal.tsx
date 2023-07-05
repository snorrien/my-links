type Props = {
    isOpen: boolean;
    children: any;
    onClose: any;
    title: string;
}

const Modal: React.FC<Props> = ({ isOpen, children, onClose, title }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-outer" onClick={onClose}>
            <div className="auth" onClick={e => e.stopPropagation()}>
                <h1 className="login__title">title</h1>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;