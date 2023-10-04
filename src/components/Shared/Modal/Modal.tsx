import { useRef } from "react";
import * as React from 'react';
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
        <div className="modal" onMouseDown={onClose}>
            <div className="modal__content" onMouseDown={e => e.stopPropagation()}>
                <h1 className="modal__title">{title}</h1>
                {children}
            </div>
        </div>
    );
}

export default Modal;