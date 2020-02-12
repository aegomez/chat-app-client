import React from 'react';

interface MessageProps {
  author: string;
  content: string;
  date: string;
}

const Message: React.FC<MessageProps> = ({ author, content, date }) => (
  <article className="box has-background-primary is-shadowless">
    <div className="content">
      <small>{author}</small>
      <small>{date}</small>
      <p>{content}</p>
    </div>
  </article>
);

export { Message };
