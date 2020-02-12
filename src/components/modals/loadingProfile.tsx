import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoadingProfile: React.FC = () => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="is-clipped has-text-centered">
          <figure className="image is-inline-block">
            <FontAwesomeIcon icon="circle-notch" size="8x" spin={true} />
          </figure>
        </div>
      </div>
    </div>
  );
};

export { LoadingProfile };
