import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { checkEmptiness } from '../utils/checkEmptiness';

export class EditedListItem extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      updatedValue: this.props.text,
    };
  }

  onTextChanged = (e) => {
    this.setState(
      { updatedValue: e.target.value }
    );
  };

  render() {
    const { text } = this.props;
    const { onSave, onDelete, onCancel } = this.props;
    const isEmpty = checkEmptiness(this.state.updatedValue);

    return (
      <div className="input-group">
        <input
          className="form-control"
          defaultValue={text}
          onChange={this.onTextChanged}
          placeholder="Type new item name..."
        />
        <div className="input-group-btn">
          <button
            data-balloon={isEmpty ? "Item name mustn't be empty" : null}
            data-balloon-pos="up"
            className="btn btn-primary"
            disabled={isEmpty}
            onClick={() => onSave(this.state.updatedValue)}
          >
            Save
          </button>
          <button
            className="btn btn-default"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>);
  }
}
