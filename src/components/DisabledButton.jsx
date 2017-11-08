import React from 'react';
import propTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const DisabledButton = (props) => {
  return (
    <span>
      <a data-tip="React-tooltip">
        <button
          className={props.buttonType}
          disabled
        >
          {props.buttonLabel}
        </button>
      </a>
      <ReactTooltip place="top" type="info" effect="solid">
        <span>
          The text mustn't be empty
        </span>
      </ReactTooltip>
    </span>
  );
};

DisabledButton.propTypes = {
  buttonLabel: propTypes.string.isRequired,
  buttonType: propTypes.string.isRequired,
};

export { DisabledButton };
