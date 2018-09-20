import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validateInput } from '../utils/inputValidator';

export class EditableItem extends PureComponent {
  static displayName = 'EditableItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.item.text
    };
  }

  _changeInput = (event) => {
    event.persist();
    this.setState(() => ({ text: event.target.value }));
  };

  _saveInput = () => this.props.onUpdateItem(this.state.text);

  render() {
    return (
      <div className="form-inline">
        <div className="form-group">
          {this.props.index}.
          <input
            className="form-control"
            type="text"
            value={this.state.text}
            onChange={this._changeInput}
            autoFocus
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this._saveInput}
            disabled={!validateInput(this.state.text)}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.onCancelEdit}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.props.onDeleteItem}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
