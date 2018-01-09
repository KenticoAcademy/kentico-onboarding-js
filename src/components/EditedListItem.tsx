import * as React from 'react';
import * as PropTypes from 'prop-types';
import { containsNoCharacters } from '../utils/containsNoCharacters';
import { ChangeEvent, PureComponent } from 'react';
import { IAction } from '../actions/IAction';

export interface IEditedListItemDataProps {
  itemText: string;
  textUpdate: string;
}

export interface IEditedListItemCallbackProps {
  onDelete: () => IAction;
  onCancel: () => IAction;
  onSave: () => IAction;
  textUpdateChange: (textUpdate: string) => IAction;
}

export class EditedListItem extends PureComponent<IEditedListItemDataProps & IEditedListItemCallbackProps> {

  static displayName = 'EditedListItem';

  static propTypes = {
    itemText: PropTypes.string.isRequired,
    textUpdate: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    textUpdateChange: PropTypes.func.isRequired,
  };

  onTextChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    const textUpdate = e.target.value;
    const { textUpdateChange } = this.props;
    textUpdateChange(textUpdate);
  };

  render() {
    const { itemText, onCancel, onDelete, textUpdate, onSave } = this.props;
    const isEmpty = containsNoCharacters(textUpdate);

    return (
      <div className="input-group">
        <input
          className="form-control"
          defaultValue={itemText}
          onChange={this.onTextChanged}
          placeholder="Type new item name..."
        />
        <div className="input-group-btn">
          <button
            data-balloon={isEmpty ? 'Item name mustn\'t be empty' : null}
            data-balloon-pos="up"
            className="btn btn-primary"
            disabled={isEmpty}
            onClick={onSave}
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
      </div>
    );
  }
}
