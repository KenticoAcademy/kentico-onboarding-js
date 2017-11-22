import PropTypes from 'prop-types';
import React from 'react';

const ListItem = ({ onClick, text }) => (
  <div
    className="form-control-static"
    onClick={onClick}
  >
    {text}
  </div>
);

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ListItem;
