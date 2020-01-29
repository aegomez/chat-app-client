import React from 'react';

interface ModalCardProps {
  title: string;
  // Button labels
  cancel: string;
  submit?: string;
  // Handle a click on the overlay or close button
  closeHandler: () => void;
  // Handle a submit button click
  submitHandler?: () => void;
}

const ModalCard: React.FC<ModalCardProps> = ({
  children,
  cancel,
  submit,
  closeHandler,
  submitHandler,
  title
}) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeHandler}></div>
      <div className="modal-card">
        <header className="modal-card-head is-dark">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeHandler}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          {submit ? (
            <button className="button is-success" onClick={submitHandler}>
              {submit}
            </button>
          ) : null}
          {cancel ? (
            <button className="button is-danger" onClick={closeHandler}>
              {cancel}
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
};

export { ModalCard };
