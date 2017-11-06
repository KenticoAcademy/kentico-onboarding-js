import React from 'react';
import propTypes from 'prop-types';

export const NewItemForm = (props) => {
  NewItemForm.propTypes = {
    newItemText: propTypes.string.required,
    onTextChange: propTypes.func.required,
    onAddItem: propTypes.func.required,
  };

  return (
    <div className="list-group-item form-inline">
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          value={props.newItemText}
          onChange={props.onTextChange}
        />
        <div className="input-group-btn">
          <button
            className="btn btn-default"
            onClick={props.onAddItem}
          >
            Add
          </button>
        </div>
      </div>
    </div>);
};
