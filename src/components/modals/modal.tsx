import React from 'react';

interface ModalProps {
  // Handle a click on the overlay or close button
  closeHandler: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, closeHandler }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeHandler}></div>
      <div className="modal-content">{children}</div>
      <button className="modal-close is-large" onClick={closeHandler}></button>
    </div>
  );
};

export { Modal };
