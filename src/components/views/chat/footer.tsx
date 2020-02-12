import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const m = {
  placeholder: 'Write a message',
  send: 'Send'
};

interface FooterProps {
  sendHandler: (message: string) => void;
}

const ChatFooter: React.FC<FooterProps> = ({ sendHandler }) => {
  const [message, setMessage] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const target = event.target;
    // Control the input value with state
    setMessage(target.value.trim());
  }
  function handleClick(): void {
    sendHandler(message);
    setMessage('');
  }
  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <footer className="field is-grouped">
      <div className="control is-expanded">
        <textarea
          className="textarea has-fixed-size is-link"
          placeholder={m.placeholder}
          rows={2}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="control">
        <button className="button is-link" onClick={handleClick}>
          <span className="icon has-text-light">
            <FontAwesomeIcon icon="paper-plane" />
          </span>
          <span>{m.send}</span>
        </button>
      </div>
    </footer>
  );
};

export { ChatFooter };
<footer className="footer">
  <div className="field">
    <div className="control"></div>
  </div>
</footer>;
