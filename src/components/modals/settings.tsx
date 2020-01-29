import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ModalCard } from './modalCard';
import { HorizontalControl } from '../forms';
import { useTypedSelector } from '../lib';
import { showSettings, showAvatarSuccess } from '@store/view/actions';
import {
  updateAvatar,
  updateLanguage,
  updatePublicName
} from '@store/profile/actions';
import { UserLanguage } from '@api/user/';

const m = {
  title: 'Settings',
  name: 'Username',
  alias: 'Alias',
  avatar: 'Avatar',
  language: 'Language',
  notValid: 'Alias must be 1-40 characters long.',
  save: 'Save',
  success: 'Updated successfully!',
  upload: 'Change image...',
  cancel: 'Cancel'
};

const Settings: React.FC = () => {
  // Redux state
  const isVisible = useTypedSelector(state => state.view.settingsVisible);
  const avatarSuccess = useTypedSelector(
    state => state.view.avatarSuccessVisible
  );
  const avatar = useTypedSelector(state => state.profile.avatar);
  const language = useTypedSelector(state => state.profile.language);
  const publicName = useTypedSelector(state => state.profile.publicName);
  const userName = useTypedSelector(state => state.profile.userName);

  const dispatch = useDispatch();

  // Internal state.
  const [alias, setAlias] = useState('');
  const [lang, setLang] = useState('');
  const [isValid, setValid] = useState(true);

  // Copy from redux to internal state at render.
  useEffect(() => {
    setAlias(publicName);
    setLang(language);
  }, [publicName, language]);

  function hideModal(): void {
    // Reset internal state
    setAlias(publicName);
    setLang(language);
    // Reset visibility flags
    dispatch(showAvatarSuccess(false));
    dispatch(showSettings(false));
  }

  // On component value changes, update the internal state.
  function changeAlias(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setAlias(value);
    // Validate the alias/publicName length.
    // Note: alias does not update immediately,
    // so the target value is compared instead.
    setValid(!!value.length && value.length < 40);
  }
  function changeLang(event: React.ChangeEvent<HTMLSelectElement>): void {
    setLang(event.target.value);
  }

  // On Save click, dispatch actions:
  // Try to synchronize state/redux/db.
  function savePublicName(): void {
    if (isValid) {
      dispatch(updatePublicName.request(alias));
    }
  }
  function saveLanguage(): void {
    dispatch(updateLanguage.request(lang as UserLanguage));
  }

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
          const url = '' + result.info.secure_url;
          dispatch(updateAvatar.request(url));
        }
      }
    );
  }

  return isVisible ? (
    <ModalCard cancel={m.cancel} closeHandler={hideModal} title={m.title}>
      <HorizontalControl label={m.name}>
        <div className="control">
          <input
            type="text"
            className="input is-static"
            value={userName}
            readOnly
          />
        </div>
      </HorizontalControl>
      <HorizontalControl label={m.alias}>
        <div className="field has-addons">
          <div className="control has-icons-left has-icons-right is-expanded">
            <input
              type="text"
              className={'input' + (!isValid ? ' is-danger' : '')}
              value={alias}
              onChange={changeAlias}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon="edit" />
            </span>
            {isValid ? null : (
              <span className="icon is-small is-right">
                <FontAwesomeIcon icon="exclamation-triangle" />
              </span>
            )}
          </div>
          <div className="control">
            <button className="button is-link" onClick={savePublicName}>
              {m.save}
            </button>
          </div>
        </div>
        <p className="help is-danger">{isValid ? null : m.notValid}</p>
      </HorizontalControl>
      <HorizontalControl label={m.language} bodyClass="has-addons">
        <div className="control has-icons-left">
          <div className="select">
            <select value={lang} onChange={changeLang}>
              <option value="auto">Auto</option>
              <option value="en">🇬🇧 - English</option>
              <option value="es">🇪🇸 - Español</option>
            </select>
          </div>
          <div className="icon is-left">
            <FontAwesomeIcon icon="globe" />
          </div>
        </div>
        <p className="control">
          <button className="button is-link" onClick={saveLanguage}>
            {m.save}
          </button>
        </p>
      </HorizontalControl>
      <HorizontalControl label={m.avatar}>
        <div className="control">
          <figure className="image is-128x128">
            <img src={avatar} alt="User avatar" />
          </figure>
          {avatarSuccess ? (
            <span className="tag is-success is-medium">{m.success}</span>
          ) : (
            <button className="button is-link" onClick={showWidget}>
              {m.upload}
            </button>
          )}
        </div>
      </HorizontalControl>
    </ModalCard>
  ) : null;
};

export { Settings };
