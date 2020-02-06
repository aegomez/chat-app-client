import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ModalCard } from './modalCard';
import { useTypedSelector } from '../lib';
import { showModal, showSuccess } from '@store/view/actions';
import { addContact } from '@store/profile/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const m = {
  title: 'Add Contacts',
  message:
    'Type the real username (not alias) and click the button to send an invitation.',
  send: 'Send Invitation',
  cancel: 'Cancel',
  success: 'Invitation was sent succesfully, you can send more invitations.',
  help: 'Username must be 1-40 characters long.'
};

const AddContact: React.FC = () => {
  // Redux state
  const isVisible = useTypedSelector(
    state => state.view.modal === 'addContact'
  );
  const isSuccess = useTypedSelector(state => state.view.updateSuccess);
  const dispatch = useDispatch();

  // Internal state
  const [query, setQuery] = useState('');
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setQuery('');
    }
  }, [isSuccess]);

  // Control input component
  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setQuery(value);
    // Validate the name length.
    // Compares the value since state is
    // updated asynchronously.
    setValid(!!value && value.length < 41);
  }

  // Dispatch redux actions
  function hideModal(): void {
    setQuery('');
    dispatch(showSuccess(false));
    dispatch(showModal('none'));
  }
  function sendRequest(): void {
    if (isValid) {
      dispatch(addContact.request(query));
    }
  }

  return isVisible ? (
    <ModalCard
      title={m.title}
      cancel={m.cancel}
      submit={m.send}
      submitDisabled={!isValid}
      closeHandler={hideModal}
      submitHandler={sendRequest}
    >
      <div className="field">
        <p className="content">{m.message}</p>
      </div>
      <div className="field">
        <div className="control has-icons-left is-expanded">
          <input
            type="text"
            className="input"
            value={query}
            onChange={handleInput}
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon="user" />
          </span>
        </div>
        <p className="help">{m.help}</p>
      </div>
      {isSuccess ? (
        <div className="field">
          <p className="content has-text-success">{m.success}</p>
        </div>
      ) : null}
    </ModalCard>
  ) : null;
};

export { AddContact };
