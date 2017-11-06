import React from 'react';
import propTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

export const DisabledButton = (props) => {
  DisabledButton.propTypes = {
    buttonLabel: propTypes.string.required,
    buttonType: propTypes.string.required,
  };

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
