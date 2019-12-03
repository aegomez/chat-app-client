import React from 'react';

const Chat: React.FC = () => {
  return (
    <article className="column">
      <header className="navbar">{'Conversation Title'}</header>
      <div>{' <-- PLACE A CHAT HERE -->'}</div>
    </article>
  );
};

export { Chat };
