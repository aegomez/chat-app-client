import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from './modal';
import { ModalCard } from './modalCard';
import { getGroupChatProps } from '@store/chat/selectors';
import { leaveGroup } from '@store/profile/actions';
import { showModal } from '@store/view/actions';

const m = {
  title: 'Group: ',
  subtitle: 'Group members:',
  addNew: 'Add new member',
  leaveGroup: 'Leave Group',
  confirmLeave: 'Are you sure you want to leave the group?',
  cancel: 'Cancel'
};

const GroupMembers: React.FC = () => {
  // Store state
  const dispatch = useDispatch();
  const group = useSelector(getGroupChatProps);

  // Show/hide leave group button
  const [showLeave, setShowLeave] = useState(false);

  if (!group) {
    return null;
  }
  const { _id, members, name } = group.ref;

  // Event handlers

  function hideModal(): void {
    dispatch(showModal('none'));
  }
  function showAddMembers(): void {
    dispatch(showModal('addMembers'));
  }
  function toggleConfirmation(): void {
    setShowLeave(!showLeave);
  }
  function handleConfirmation(): void {
    dispatch(leaveGroup.request(_id));
    setShowLeave(false);
  }

  return (
    <ModalCard
      title={m.title + name}
      cancel={m.cancel}
      closeHandler={hideModal}
    >
      <p className="subtitle">{m.subtitle}</p>
      <ul>
        {members.map((member, index) => {
          const { avatar, publicName, userName } = member;
          return (
            <li className="level is-mobile" key={index}>
              <div className="level-left">
                <div className="level-item">
                  <figure className="image is-32x32">
                    <img src={avatar} alt="Avatar" />
                  </figure>
                </div>
                <div className="level-item">
                  <p className="title is-5">{publicName}</p>
                </div>
                <div className="level-item">
                  <p className="subtitle is-6">{userName}</p>
                </div>
              </div>
            </li>
          );
        })}
        <li className="buttons">
          <button className="button is-dark" onClick={showAddMembers}>
            {m.addNew}
          </button>
          <button className="button is-danger" onClick={toggleConfirmation}>
            {m.leaveGroup}
          </button>
        </li>
      </ul>
      {showLeave ? (
        <Modal
          closeHandler={toggleConfirmation}
          confirmHandler={handleConfirmation}
          title={m.leaveGroup}
          subtitle={m.confirmLeave}
        />
      ) : null}
    </ModalCard>
  );
};

export { GroupMembers };
