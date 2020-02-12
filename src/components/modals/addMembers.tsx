import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalCard } from './modalCard';
import { SearchBox } from '../forms';
import { getGroupChatProps } from '@store/chat/selectors';
import { addGroupMember } from '@store/profile/actions';
import { showModal } from '@store/view/actions';
import { getNotInGroupContacts } from '@store/profile/selectors';

const m = {
  title: 'Group: ',
  subtitle: 'Select one or more of your contacts to add to the group ',
  submit: 'Add to group',
  addNew: 'Add new member(s)',
  showCurrent: 'Show current members',
  cancel: 'Cancel'
};

const AddMembers: React.FC = () => {
  // Store state
  const dispatch = useDispatch();
  const group = useSelector(getGroupChatProps);
  const contacts = useSelector(getNotInGroupContacts);

  // Internal state
  const [filter, setFilter] = useState('');
  // Array of checkmarked values
  const [checkArray, setCheckArray] = useState<string[]>([]);

  if (!group) {
    return null;
  }
  const { _id, name } = group.ref;

  // Event handlers
  function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>): void {
    const { checked, value } = event.target;
    const userId = contacts[+value].ref._id;
    if (checked) {
      setCheckArray(oldState => [...oldState, userId]);
    } else {
      setCheckArray(oldState => {
        const index = oldState.indexOf(userId);
        if (index >= 0) {
          oldState.splice(index, 1);
        }
        return oldState;
      });
    }
  }

  function handleSearchBox(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFilter(event.target.value.trimLeft());
  }
  function dispatchRequest(): void {
    for (const userId of checkArray) {
      dispatch(
        addGroupMember.request({
          groupId: _id,
          userId
        })
      );
    }
  }

  function hideModal(): void {
    dispatch(showModal('none'));
  }
  function showCurrentMembers(): void {
    dispatch(showModal('groupMembers'));
  }

  return (
    <ModalCard
      title={m.title + name}
      cancel={m.cancel}
      closeHandler={hideModal}
      submit={m.submit}
      submitHandler={dispatchRequest}
    >
      <p className="subtitle">
        {m.subtitle}
        <strong>{name}</strong>
      </p>
      <SearchBox handleChange={handleSearchBox} />
      <ul>
        {contacts.map((contact, index) => {
          const { avatar, publicName, userName } = contact.ref;
          // Filter by name
          const isMatch = publicName
            .toLowerCase()
            .includes(filter.toLowerCase());
          return isMatch ? (
            <li className="level is-mobile" key={index}>
              <div className="level-left">
                <div className="level-item">
                  <div className="control">
                    <input
                      type="checkbox"
                      value={index}
                      onChange={handleCheckbox}
                    />
                  </div>
                </div>
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
          ) : null;
        })}
        <li>
          <button className="button is-dark" onClick={showCurrentMembers}>
            {m.showCurrent}
          </button>
        </li>
      </ul>
    </ModalCard>
  );
};

export { AddMembers };
