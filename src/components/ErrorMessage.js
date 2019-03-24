import React from 'react';
import Translate from '../localization/Translate';

const ErrorMessage = props => {
  return (
    <div className="text-center">
      <h4>
        <Translate string={'error'} />
      </h4>
      <p>{props.error.message}</p>
    </div>
  );
};

export default ErrorMessage;
