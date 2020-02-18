import React from 'react';

interface HeaderProps {
  avatar: string;
  title: string;
  subtitle: string;
}

const ChatHeader: React.FC<HeaderProps> = ({
  avatar,
  title,
  subtitle,
  children
}) => (
  <header className="level is-marginless">
    <div className="level-left">
      <div className="level-item">
        <figure className="image is-48x48">
          <img src={avatar} alt="Avatar" />
        </figure>
      </div>
      <div className="level-item">
        <span className="title">{title}</span>
      </div>
      <div className="level-item is-hidden-mobile">
        <span className="subtitle">{subtitle}</span>
      </div>
      {children}
    </div>
  </header>
);

export { ChatHeader };
