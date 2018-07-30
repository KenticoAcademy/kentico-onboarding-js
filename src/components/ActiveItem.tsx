import React from 'react';
import PropTypes from 'prop-types';

import { ListItem } from '../models/ListItem';

export class ActiveItem extends React.PureComponent {
  static displayName = 'ActiveItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.instanceOf(ListItem).isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onCancelItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: props.item.text,
    };
  }

  _saveInputValue = () => this.props.onSaveItem(this.state.text);

  _storeInputValue = event => {
    const text = event.target.value;
    this.setState({ text });
  };

  render() {
    return (
      <div className="input-group col-md-8">
        <span className="input-group-addon">
          {this.props.index + 1}.
        </span>
        <input
          className="form-control"
          type="text"
          value={this.state.text}
          onChange={this._storeInputValue}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={this._saveInputValue}
          >
            Save
          </button>
          <button
            className="btn btn-default"
            type="submit"
            onClick={this.props.onCancelItem}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            type="submit"
            onClick={this.props.onDeleteItem}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}
