import React from 'react';

import { Chat } from './chat';
import { Sidebar } from './sidebar';

const Dashboard: React.FC = () => {
  return (
    <section className="columns is-mobile is-fullheight is-marginless">
      <Sidebar />
      <Chat />
    </section>
  );
};

export { Dashboard };
