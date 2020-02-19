import React from 'react';

import { useTypedSelector } from '../../lib';

const m = {
  title: 'Welcome ',
  subtitle: 'Start a conversation by clicking it in the left sidebar.'
};

const Welcome: React.FC = () => {
  const name = useTypedSelector(state => state.profile.publicName);
  const avatar = useTypedSelector(state => state.profile.avatar);

  return (
    <div className="column has-background-white-bis">
      <section className="section">
        <div className="container content has-text-centered">
          <h2 className="title">{m.title + name}</h2>
          <figure className="image is-128x128  is-inline-block">
            <img src={avatar} alt="Avatar" className="is-rounded" />
          </figure>
          <h4 className="subtitle">{m.subtitle}</h4>
        </div>
      </section>
    </div>
  );
};

export { Welcome };
