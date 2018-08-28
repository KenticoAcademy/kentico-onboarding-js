import React from 'react';
import PropTypes from 'prop-types';

export const ShowItem = (props) => (
  <div
    role="presentation"
    onClick={props.handlerClick}
  >
      {props.position}. {props.text}
  </div>
);

ShowItem.displayName = 'ShowItem';

ShowItem.propTypes = {
  position: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
