import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validateInput } from '../utils/inputValidator';

export class EditableItem extends PureComponent {
  static displayName = 'EditableItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.item.value
    };
  }

  _changeInput = (event) => {
    event.persist();
    this.setState(() => ({ value: event.target.value }));
  };

  _saveInput = () => this.props.onEdit(this.props.item.id, this.state.value);

  _cancelEdit = () => this.props.onCancel(this.props.item.id);

  _deleteItem = () => this.props.onDelete(this.props.item.id);

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          {this.props.index}.
          <input
            className="form-control"
            type="text"
            value={this.state.value}
            onChange={this._changeInput}
            autoFocus
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this._saveInput}
            disabled={!validateInput(this.state.value)}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={this._cancelEdit}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this._deleteItem}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
