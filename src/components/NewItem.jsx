// components/NewItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

export class NewItem extends React.PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    onAddItem: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired,
    processKeyboardShorts: PropTypes.func.isRequired,
    isInputValid: PropTypes.bool.isRequired,
  };

  _handleChange = (event) => this.props.onValueChange(event.target.value);

  _handleKeyUp = (event) => this.props.processKeyboardShorts(event.key, event.target.itemValue);

  _addItem = () => this.props.onAddItem(this.props.itemValue);

  render() {
    const { itemValue, isInputValid } = this.props;

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
              onClick={this._addItem}
              disabled={!isInputValid}
            > Add
            </button>
          </span>
        </div>
      </div>
    );
  }
}

