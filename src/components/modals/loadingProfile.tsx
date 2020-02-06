import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Modal } from './modal';
import { useTypedSelector } from '../lib';

const LoadingProfile: React.FC = () => {
  const isLoading = useTypedSelector(
    state => state.view.modal === 'loadingProfile'
  );
  return isLoading ? (
    <Modal closeHandler={() => {}}>
      <div className="container is-clipped has-text-centered">
        <figure className="image is-inline-block">
          <FontAwesomeIcon icon="circle-notch" size="8x" spin={true} />
        </figure>
      </div>
    </Modal>
  ) : null;
};

export { LoadingProfile };
