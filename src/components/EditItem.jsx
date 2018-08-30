import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class EditItem extends PureComponent {
  static displayName = 'EditItem';

  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    finishEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.text,
  };

  _textEdit = event => {
    const eventTargetValue = event.target.value;
    this.setState(() => ({ text: eventTargetValue }));
  };

  _saveItem = () => {
    this.props.onSave(this.props.id, this.state.text);
    this.props.finishEdit();
  };

  _deleteItem = () => this.props.onDelete(this.props.id);

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          {this.props.position + '. '}
          <input
            type="text"
            className="form-control"
            id="text"
            value={this.state.text}
            onChange={this._textEdit}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this._saveItem}
            disabled={!this.state.text}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={this.props.finishEdit}
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
      </form>
    );
  }
}
