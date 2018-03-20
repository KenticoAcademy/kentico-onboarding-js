// components/NewItem.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Shortcuts } from 'react-shortcuts';

import { isInputValid } from '../utils/validationService';

export class NewItem extends React.PureComponent {
  static displayName = 'NewItem';

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      itemValue: '',
    };
  }

  _handleShortcuts = (action) => {
    switch (action) {
      case 'ITEM_EDIT_CONFIRM':
        if (isInputValid(this.state.itemValue)) {
          this._addItem();
        }
        break;
      case 'ITEM_EDIT_CANCEL':
      case 'ITEM_DELETE':
        this.setState({ itemValue: '' });
        break;
      default:
        break;
    }
  };

  _handleChange = (event) => this.setState({ itemValue: event.target.value });

  _addItem = () => {
    this.props.addItem(this.state.itemValue);
    this.setState({ itemValue: '' });
  };

  render() {
    const { itemValue } = this.state;

    return (
      <Shortcuts name="NewItem" handler={this._handleShortcuts}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What is on your mind ... ?"
            value={itemValue}
            onChange={this._handleChange}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-default"
              onClick={this._addItem}
              disabled={!isInputValid(itemValue)}
            > Add
            </button>
          </span>
        </div>
      </Shortcuts>
    );
  }
}

