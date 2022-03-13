import React from "react";
import "./modal.css";
import { ReactComponent as CloseIcon } from '../../icons/close_icon.svg';

const Modal = ({ isOpen, onCloseModal, handleClear, children }) => isOpen && (
    <div className="modalWrapper">
        <div className="mainModal">
            <section className="modalBox">
                <a href="#" onClick={(event) => { event.preventDefault(); onCloseModal(!isOpen); handleClear(); }}>
                    <CloseIcon className="closeIcon" />
                </a>
                <div className="modalContent">{children}</div>
            </section>
        </div>
    </div>
);

export default Modal;