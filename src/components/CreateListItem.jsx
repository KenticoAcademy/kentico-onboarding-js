import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class CreateListItem extends PureComponent {
  static displayName = 'CreateListItem';

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      newItemText: '',
    };
  }

  _updateItemText = (e) => {
    this.setState({
      newItemText: e.target.value,
    });
  };

  _submitItemText = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.newItemText);

    this.setState({
      newItemText: '',
    });
  };

  render() {
    return (
      <li className="list-group-item">
        <span className="form-group">
          <input
            type="text"
            className="form-control"
            value={this.state.newItemText}
            onChange={this._updateItemText}
            aria-label="New item text"
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this._submitItemText}
          >Add
          </button>
        </span>
      </li>
    );
  }
}
