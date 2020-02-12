import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* TBD i18n */
const m = {
  search: 'Search contact'
};

interface SearchProps {
  handleChange(event: React.ChangeEvent): void;
}

const SearchBox: React.FC<SearchProps> = ({ handleChange }) => {
  return (
    <div className="field control has-icons-left">
      <input
        type="text"
        name="searchConversation"
        className="input"
        placeholder={m.search}
        onChange={handleChange}
      />
      <span className="icon is-left has-text-dark">
        <FontAwesomeIcon icon="search" />
      </span>
    </div>
  );
};

export { SearchBox };
