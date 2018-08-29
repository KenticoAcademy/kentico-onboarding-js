import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class EditableItem extends PureComponent {
  static displayName = 'EditableItem';

  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }

  _changeInput = (event) => {
    this.setState({ value: event.target.value });
  };

  _saveInput = () => this.props.onEdit(this.state.value);

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
          >Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.onCancel}
          >Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.props.onDelete}
          >Delete
          </button>
        </div>
      </div>
    );
  }
}

EditableItem.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
