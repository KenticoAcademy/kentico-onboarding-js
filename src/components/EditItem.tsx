import * as React from 'react';
import classNames from 'classnames';
import { isValidText } from '../utils/validateText';
import { itemInterface } from '../constants/itemInterface';

export interface EditItemProps {
  item: itemInterface,
  index: number,
  onCancelClick: Function,
  onSaveClick: Function,
  onDeleteClick: Function
}

export interface EditItemState {
  text: string
}

export class EditItem extends React.PureComponent<EditItemProps, EditItemState> {
  static displayName = 'EditItem';

  constructor(props: EditItemProps) {
    super(props);
    this.state = {
      text: props.item.text
    };
  }

  _cancelEditing = () => this.props.onCancelClick(this.props.item.id);

  _deleteItem = () => this.props.onDeleteClick(this.props.item.id);

  _editItem = () => this.props.onSaveClick(this.props.item.id, this.state.text);

  _updateText = event => this.setState({
    text: event.target.value
  });

  render() {
    const validText = isValidText(this.state.text);
    return (
      <div className="list-group-item">
        <li
          className={classNames({
            "input-group": true,
            "has-error": !validText,
            "has-success": validText
          })}
        >
          <p className="input-group-addon">
            {this.props.index}
          </p>
          <input
            type="text"
            className="form-control"
            name="itemToModify"
            onChange={this._updateText}
            value={this.state.text}
            required
          />
          <div className="input-group-append input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              name="itemToModifySaveButton"
              value="Save"
              onClick={this._editItem}
              disabled={!validText}
            >
              Save
            </button>
            <button
              className="btn btn-light"
              type="button"
              name="itemToModifyCancelButton"
              value="Cancel"
              onClick={this._cancelEditing}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              type="button"
              name="itemToModifyDeleteButton"
              value="Delete"
              onClick={this._deleteItem}
            >
              Delete
            </button>
          </div>
        </li>
      </div>
    );
  }
}
