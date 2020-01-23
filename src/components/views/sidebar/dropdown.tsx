import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../lib';
import { setLogoutVisible, setSettingsVisible } from '@store/view/actions';

/* TBD i18n */
const m = {
  settings: 'Settings',
  logout: 'Log Out'
};

const Dropdown: React.FC = () => {
  const [isDropdownActive, setDropdownActive] = useState(false);
  const avatar = useTypedSelector(state => state.profile.avatar);
  const publicName = useTypedSelector(state => state.profile.publicName);
  const dispatch = useDispatch();

  function showDropdown(): void {
    setDropdownActive(!isDropdownActive);
  }

  function showSettings(event: React.MouseEvent): void {
    event.preventDefault();
    setDropdownActive(false);
    dispatch(setSettingsVisible(true));
  }

  function showLogout(event: React.MouseEvent): void {
    event.preventDefault();
    setDropdownActive(false);
    dispatch(setLogoutVisible(true));
  }

  return (
    <header
      className={
        'dropdown is-fullwidth is-right' +
        (isDropdownActive ? ' is-active' : '')
      }
    >
      <div className="dropdown-trigger">
        <button
          className="button is-fullwidth is-medium is-dark has-text-weight-bold"
          onClick={showDropdown}
        >
          <span>{publicName}</span>
          <span className="icon">
            <FontAwesomeIcon icon="angle-down" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu has-text-weight-semibold">
        <div className="dropdown-content has-text-centered">
          <div className="dropdown-item is-size-5">{publicName}</div>
          <div className="dropdown-item">
            <figure className="image is-64x64 is-inline-block">
              <img src={avatar} alt="User avatar" className="is-rounded" />
            </figure>
          </div>
          <a className="dropdown-item media is-size-6" onClick={showSettings}>
            <span className="icon media-left">
              <FontAwesomeIcon icon="wrench" />
            </span>
            <span className="media-content">{m.settings}</span>
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item media is-size-6" onClick={showLogout}>
            <span className="icon media-left">
              <FontAwesomeIcon icon="sign-out-alt" />
            </span>
            <span className="media-content">{m.logout}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export { Dropdown };
