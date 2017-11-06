import React from 'react';
import propTypes from 'prop-types';
import { DisabledButton } from './DisabledButton';

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
          {props.newItemText === '' ?
            <DisabledButton
              buttonLabel="Add"
              buttonType="btn btn-default"
            /> : <button
              className="btn btn-default"
              onClick={props.onAddItem}
            >
              Add
            </button>
          }
        </div>
      </div>
    </div>);
};
