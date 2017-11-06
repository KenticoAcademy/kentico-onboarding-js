import React from 'react';
import propTypes from 'prop-types';

export const NewItemForm = (props) => {
  NewItemForm.propTypes = {
    newItemText: propTypes.string.required,
    onTextChange: propTypes.func.required,
    onAddItem: propTypes.func.required,
  };
  return (
    <div className="list-group-item">
      <div className="form-inline">
        <input
          className="form-control"
          type="text"
          value={props.newItemText}
          onChange={props.onTextChange}
        />
        <button
          className="btn btn-default"
          title="Add"
          onClick={props.onAddItem}
        >Add
        </button>
      </div>
    </div>);
};
