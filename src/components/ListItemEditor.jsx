// components/ListItemEditor.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { isInputValid } from '../utils/validationService';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';

  static propTypes = {
    itemValue: PropTypes.string.isRequired,
    bullet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemValue: props.itemValue,
    };
  }

  _handleInputChange = (event) => this.setState({ itemValue: event.target.value });

  _handleInputKeyUp = (event) => {
    if (event.key === 'Enter' && isInputValid(this.state.itemValue)) {
      this._updateItem();
    }
    else if (event.key === 'Escape') {
      this.props.onCancel();
    }
  };

  _updateItem = () => this.props.onUpdate(this.state.itemValue);

  render() {
    const { onCancel, onDelete, bullet } = this.props;
    const { itemValue } = this.state;

    return (
      <div className="input-group">
        <span className="input-group-addon">
          {bullet}
        </span>
        <input
          type="text"
          className="form-control"
          value={itemValue}
          onChange={this._handleInputChange}
          onKeyUp={this._handleInputKeyUp}
          autoFocus
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this._updateItem}
            disabled={!isInputValid(itemValue)}
          > Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={onCancel}
          > Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onDelete}
          > Delete
          </button>
        </span>
      </div>
    );
  }
}
