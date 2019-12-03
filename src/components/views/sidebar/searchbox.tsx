import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* TBD i18n */
const m = {
  search: 'Search conversation'
};

const SearchBox: React.FC = () => {
  return (
    <div className="field control has-icons-left">
      <input
        type="text"
        name="searchConversation"
        className="input"
        placeholder={m.search}
      />
      <span className="icon is-left has-text-dark">
        <FontAwesomeIcon icon="search" />
      </span>
    </div>
  );
};

export { SearchBox };
