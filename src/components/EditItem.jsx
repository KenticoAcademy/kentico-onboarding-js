import React, { PureComponent } from 'react';

export class EditItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
  }

  _textEdit = (e) => {
    this.setState({ text: e.target.value });
  };

  _saveItem = () => {
    this.props.onSave(this.props.pos, this.state.text);
    this.props.finishEdit();
  };

  _delItem = () => {
    this.props.onDelete(this.props.pos);
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
