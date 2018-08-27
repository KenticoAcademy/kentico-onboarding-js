import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class EditItem extends PureComponent {
  static displayName = 'EditItem';

  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    finishEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      text: this.props.text,
    };
  }

  _textEdit = (e) => {
    this.setState({ text: e.target.value });
  };

  _saveItem = () => {
    this.props.onSave(this.state.id, this.state.text);
    this.props.finishEdit();
  };

  _delItem = () => {
    this.props.onDelete(this.state.id);
  };

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          {this.props.pos + '. '}
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
            onClick={this._delItem}
          >
            Delete
          </button>
        </div>
      </form>
    );
  }
}
