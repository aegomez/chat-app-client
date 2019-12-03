import React from 'react';

import { Dropdown } from './dropdown';
import { SearchBox } from './searchbox';
import { Controls } from './controls';
import { Contact } from './contact';

/* TBD i18n */
const m = {
  contactsLabel: 'Contacts',
  groupsLabel: 'Groups'
};

const placeholder = './img/24x24.png';

const Sidebar: React.FC = () => {
  return (
    <aside className="column is-one-quarter has-background-dark">
      <Dropdown />
      <SearchBox />
      <div className="menu is-dark">
        <Controls />
        <p className="menu-label">{m.contactsLabel}</p>
        <ul className="menu-list">
          <li>
            <ul>
              <Contact
                name="Fulanito"
                avatar={placeholder}
                isActiveConversation={false}
                isOnline={true}
              />
              <Contact
                name="Menganito"
                avatar={placeholder}
                isActiveConversation={true}
                isOnline={false}
              />
            </ul>
          </li>
        </ul>
        <p className="menu-label has-text-weight-bold">{m.groupsLabel}</p>
        <ul className="menu-list">
          <li>
            <ul>
              <li>
                <a>Group Chat</a>
              </li>
              <li>
                <a>Group Chat</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export { Sidebar };
