import React from 'react';

interface ModalProps {
  // Handle a click on the overlay or close button
  closeModal: () => void;
  // Show/hide the modal
  isActive: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal, isActive }) => {
  return isActive ? (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">{children}</div>
      <button className="modal-close is-large" onClick={closeModal}></button>
    </div>
  ) : null;
};

export { Modal };
