import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* TBD i18n */
const m = {
  settings: 'Settings',
  logout: 'Log Out'
};

const Dropdown: React.FC = () => {
  const [isDropdownActive, setDropdownActive] = useState(false);

  function showDropdown(): void {
    setDropdownActive(!isDropdownActive);
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
          <span>{'User Name'}</span>
          <span className="icon">
            <FontAwesomeIcon icon="angle-down" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu has-text-weight-semibold">
        <div className="dropdown-content has-text-centered">
          <div className="dropdown-item is-size-5">{'User Name'}</div>
          <div className="dropdown-item">
            <figure className="image is-64x64 is-inline-block">
              <img
                src="https://bulma.io/images/placeholders/64x64.png"
                alt="User avatar"
                className="is-rounded"
              />
            </figure>
          </div>
          <a className="dropdown-item media is-size-6">
            <span className="icon media-left">
              <FontAwesomeIcon icon="wrench" />
            </span>
            <span className="media-content">{m.settings}</span>
          </a>
          <a className="dropdown-divider"></a>
          <a className="dropdown-item media is-size-6">
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
