import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';

interface IEditItemProps {
  position: number;
  text: string;
  onSave: (text: string) => void;
  onDelete: () => void;
  finishEdit: () => void;
}

export class EditItem extends PureComponent<IEditItemProps> {
  static displayName = 'EditItem';

  static propTypes = {
    text: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    finishEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.text,
  };

  _textEdit = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTargetValue = event.currentTarget.value;
    this.setState(() => ({ text: eventTargetValue }));
  };

  _saveItem = () => {
    this.props.onSave(this.state.text);
    this.props.finishEdit();
  };

  _deleteItem = () => this.props.onDelete();

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
