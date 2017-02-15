import React from 'react';

function ListItemLabel(props) {
  return (
    <div onClick={props.onClickHandler} >{props.index}. {props.text}</div>
  );
}

ListItemLabel.propTypes = {
  text: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  onClickHandler: React.PropTypes.func.isRequired,
};

export default ListItemLabel;
