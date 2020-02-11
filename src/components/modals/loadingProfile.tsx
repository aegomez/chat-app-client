import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from './modal';

const LoadingProfile: React.FC = () => {
  return (
    <Modal closeHandler={() => {}}>
      <div className="container is-clipped has-text-centered">
        <figure className="image is-inline-block">
          <FontAwesomeIcon icon="circle-notch" size="8x" spin={true} />
        </figure>
      </div>
    </Modal>
  );
};

export { LoadingProfile };
