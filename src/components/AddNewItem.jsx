import React, { PureComponent } from 'react';
import { checkEmptiness } from '../utils/checkEmptiness';
import { addItem } from '../utils/actionCreators';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types,import/no-mutable-exports
export let AddNewItem = ({ dispatch }) => {
  let input = '';
  const isEmpty = checkEmptiness(input);

  return (
    <div className="list-group-item form-inline">
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          ref={node => {
            input = node;
          }}
          placeholder="Type new item name..."
        />
        <div className="input-group-btn">
          <button
            data-balloon={isEmpty ? "Item name mustn't be empty" : null}
            data-balloon-pos="up"
            className="btn btn-default"
            disabled={isEmpty}
            onClick={e => {
              e.preventDefault();
              if (!input.value.trim()) {
                return;
              }
              dispatch(addItem(input.value));
              input.value = '';
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

AddNewItem = connect()(AddNewItem);

