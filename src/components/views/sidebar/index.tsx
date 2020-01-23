import React, { useState } from 'react';

import { Dropdown } from './dropdown';
import { SearchBox } from './searchbox';
import { Controls } from './controls';
import { ContactList } from './contacts';
import { GroupList } from './groups';

/* TBD i18n */
const m = {
  contactsLabel: 'Contacts',
  groupsLabel: 'Groups'
};

const Sidebar: React.FC = () => {
  const [searchFilter, setFilter] = useState('');

  function handleSearchbox(event: React.ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setFilter(event.target.value);
  }

  return (
    <aside className="column is-one-quarter has-background-dark">
      <Dropdown />
      <SearchBox handleChange={handleSearchbox} />
      <div className="menu is-dark has-text-weight-bold">
        <Controls />
        <p className="menu-label">{m.contactsLabel}</p>
        <ul className="menu-list">
          <li>
            <ContactList filter={searchFilter} />
          </li>
        </ul>
        <p className="menu-label has-text-weight-bold">{m.groupsLabel}</p>
        <ul className="menu-list">
          <li>
            <GroupList filter={searchFilter} />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export { Sidebar };
