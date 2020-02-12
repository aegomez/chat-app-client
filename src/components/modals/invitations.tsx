import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalCard } from './modalCard';
import { updateContact } from '@store/profile/actions';
import { getPendingContacts } from '@store/profile/selectors';
import { showModal } from '@store/view/actions';
import { PartialUserSchema, ContactStatus } from '@api/user';

const m = {
  title: 'Contact Invitations',
  subtitle:
    'The following people have sent you an invitation to be your contact:',
  checkbox: 'Show block buttons.',
  accept: 'Accept',
  block: 'Block',
  cancel: 'Cancel'
};

interface InvitationProps extends PartialUserSchema {
  buttonHandler: (id: string, status: ContactStatus) => void;
  showBlock: boolean;
}

// Repeateable list item
const Invitation: React.FC<InvitationProps> = ({
  _id,
  avatar,
  publicName,
  userName,
  buttonHandler,
  showBlock
}) => {
  function handleAccept(): void {
    buttonHandler(_id, 'accepted');
  }
  function handleBlock(): void {
    buttonHandler(_id, 'blocked');
  }

  return (
    <li className="level">
      <div className="level-left">
        <figure className="level-item image is-64x64">
          <img src={avatar} alt="Avatar" />
        </figure>
        <div className="level-item">
          <div className="content">
            <p className="title is-4">{publicName}</p>
            <p className="subtitle is-6">{userName}</p>
          </div>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <button className="button is-success" onClick={handleAccept}>
            {m.accept}
          </button>
        </div>
        {showBlock ? (
          <div className="level-item">
            <button className="button is-danger" onClick={handleBlock}>
              {m.block}
            </button>
          </div>
        ) : null}
      </div>
    </li>
  );
};

// List container
const Invitations: React.FC = () => {
  // Redux state
  const pendingContacts = useSelector(getPendingContacts);
  const dispatch = useDispatch();

  // Internal state
  const [showBlock, setShowBlock] = useState(false);

  // Control input element
  function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>): void {
    setShowBlock(event.target.checked);
  }

  // Dispatch redux actions
  function requestUpdate(targetId: string): void {
    dispatch(updateContact.request({ targetId, newStatus: 'accepted' }));
  }
  function hideModal(): void {
    dispatch(showModal('none'));
  }

  return (
    <ModalCard title={m.title} cancel={m.cancel} closeHandler={hideModal}>
      <p className="content">{m.subtitle}</p>
      <ul>
        {pendingContacts.map((contact, key) => {
          const props = {
            ...contact.ref,
            buttonHandler: requestUpdate,
            showBlock
          };
          return <Invitation {...props} key={key} />;
        })}
      </ul>
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={showBlock}
              onChange={handleCheckbox}
            />
            {'  ' + m.checkbox}
          </label>
        </div>
      </div>
    </ModalCard>
  );
};

export { Invitations };
