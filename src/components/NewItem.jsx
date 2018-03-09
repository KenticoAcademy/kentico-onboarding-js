// components/NewItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

export class NewItem extends React.PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    handleKeyboardShortcuts: PropTypes.func.isRequired,
    isInputValid: PropTypes.bool.isRequired,
  };

  _handleChange = (event) => this.props.handleValueChange(event.target.value);

  _handleKeyUp = (event) => this.props.handleKeyboardShortcuts(event.key, event.target.itemValue);

  render() {
    const { itemValue, isInputValid, addItem } = this.props;

    return (
      <div className="row">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What is on your mind ... ?"
            value={itemValue}
            onChange={this._handleChange}
            onKeyDown={this._handleKeyUp}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-default"
              onClick={() => addItem(itemValue)}
              disabled={!isInputValid}
            > Add
            </button>
          </span>
        </div>
      </div>
    );
  }
}

