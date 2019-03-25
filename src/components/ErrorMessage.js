import React from 'react';
import Translate from '../localization/Translate';
import PropTypes from 'prop-types';

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

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired
};

ErrorMessage.defaultProps = {
  error: {
    message: 'Error'
  }
};

export default ErrorMessage;
