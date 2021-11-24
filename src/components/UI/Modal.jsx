/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = ({ onClose }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div className={classes.backdrop} onClick={onClose} />
);

const ModalOverlay = ({ children }) => (
  <div className={classes.modal}>
    <div className={classes.content}>{children}</div>
  </div>
);
const portalElement = document.getElementById('overlay');

const Modal = ({ onClose, children }) => (

  <div>
    {ReactDOM.createPortal(
      <Backdrop onClose={onClose} />, portalElement,
    )}
    {ReactDOM.createPortal(
      <ModalOverlay>{children}</ModalOverlay>, portalElement,
    )}
  </div>
);

export default Modal;
