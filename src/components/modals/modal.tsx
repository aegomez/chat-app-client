import React from 'react';

const m = {
  confirm: 'OK',
  cancel: 'Cancel'
};

interface ModalProps {
  // Handle a click on the overlay or close button
  closeHandler: () => void;
  confirmHandler: () => void;
  title: string;
  subtitle: string;
  confirmLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  closeHandler,
  confirmHandler,
  confirmLabel,
  title,
  subtitle
}) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeHandler}></div>
      <div className="modal-content">
        <div className="box">
          <p className="title">{title}</p>
          <p className="subtitle">{subtitle}</p>
          {children}
          <div className="buttons is-right">
            <button className="button is-link" onClick={confirmHandler}>
              {confirmLabel || m.confirm}
            </button>
            <button className="button is-danger" onClick={closeHandler}>
              {m.cancel}
            </button>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" onClick={closeHandler}></button>
    </div>
  );
};

export { Modal };
