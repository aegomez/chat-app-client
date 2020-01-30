import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ModalCard } from './modalCard';
import { useTypedSelector } from '../lib';
import { showCreateGroup, showGroupSuccess } from '@store/view/actions';
import { createGroup } from '@store/profile/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const m = {
  title: 'Create New Group',
  message:
    'Type the name of the group, you can also add a custom group avatar.',
  create: 'Create Group',
  cancel: 'Cancel',
  noImage: 'Group avatar will be randomly generated.',
  upload: 'Upload custom avatar...',
  success:
    'Group was created successfully! Select it on the sidebar to open the chat.',
  help: 'Group name must be 1-40 characters long.'
};

const CreateGroup: React.FC = () => {
  // Redux state
  const isVisible = useTypedSelector(state => state.view.createGroupVisible);
  const isSuccess = useTypedSelector(state => state.view.groupSuccessVisible);
  const dispatch = useDispatch();

  // Internal state
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [isValid, setValid] = useState(false);

  // Control input component
  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setName(value);
    // Validate the name length.
    // Compares the value since state is
    // updated asynchronously.
    setValid(!!value && value.length < 41);
  }

  // Dispatch redux actions
  function hideModal(): void {
    setName('');
    dispatch(showGroupSuccess(false));
    dispatch(showCreateGroup(false));
  }
  function sendRequest(): void {
    if (isValid) {
      dispatch(createGroup.request({ avatar, name }));
    }
  }

  // Show the cloudinary widget
  function showWidget(): void {
    cloudinary.openUploadWidget(
      {
        cloudName: 'nonamechat',
        uploadPreset: 'r38gied5',
        maxFiles: 1,
        cropping: true,
        croppingAspectRatio: 1,
        resourceType: 'image'
      },
      (error, result) => {
        if (error) {
          return console.error(error);
        }
        if (result && result.event === 'success') {
          setAvatar('' + result.info.secure_url);
        }
      }
    );
  }

  return isVisible ? (
    <ModalCard
      title={m.title}
      cancel={m.cancel}
      submit={isSuccess ? undefined : m.create}
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
            value={name}
            onChange={handleInput}
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon="edit" />
          </span>
        </div>
        <p className="help">{m.help}</p>
      </div>
      <div className="field">
        {avatar ? (
          <figure className="image is-128x128">
            <img src={avatar} alt="Group avatar" />
          </figure>
        ) : (
          <p className="content is-italic">{m.noImage}</p>
        )}
        <button className="button is-link" onClick={showWidget}>
          {m.upload}
        </button>
      </div>
      {isSuccess ? (
        <div className="field">
          <p className="content is-success">{m.success}</p>
        </div>
      ) : null}
    </ModalCard>
  ) : null;
};

export { CreateGroup };
