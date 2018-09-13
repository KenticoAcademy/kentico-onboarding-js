import * as React from 'react';
import * as PropTypes from 'prop-types';
import { containsNoCharacters } from '../../utils/containsNoCharacters';
import { IAction } from '../../actions/IAction';
import {
  IItem,
  Item
} from '../../models/Item';
import { ItemId } from '../../models/ItemId';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { alertTypes } from '../../constants/alert/alertTypes';
import { alertMessages } from '../../constants/alert/alertMessages';

export interface IEditListItemContainerProps {
  itemId: ItemId;
}

export interface IEditedListItemDataProps {
  item: IItem;
}

export interface IEditedListItemCallbackProps {
  onCancel: () => IAction;
  onSave: (textUpdate: string) => Promise<IAction>;
  textUpdateChange: (textUpdate: string) => IAction;
  assertAlert: (type: alertTypes, message: alertMessages) => number;
}

type IEditedListItemProps = IEditListItemContainerProps & IEditedListItemDataProps & IEditedListItemCallbackProps;

export class EditedListItem extends React.PureComponent<IEditedListItemProps> {

  static displayName = 'EditedListItem';

  static propTypes = {
    item: PropTypes.instanceOf(Item),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    textUpdateChange: PropTypes.func.isRequired,
  };

  _onSaveItem = (): void => {
    const {onSave, item, assertAlert} = this.props;
    onSave(item.textUpdate)
      .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.UPDATE_SUCCESS))
      .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPDATE_ERROR));
  };

  _onTextChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const textUpdate = e.target.value;
    const {textUpdateChange} = this.props;
    textUpdateChange(textUpdate);
  };

  _buttonLabel = (): string => {
    const {item} = this.props;
    const uploadError = item.errorMessages.keySeq().contains(errorMessageTypes.UPLOAD);
    const someError = item.errorMessages.size !== 0;

    if (uploadError) return 'Modify the word you wanted to upload!';
    if (someError) return 'Save the word again!';
    return 'Save the word!';
  };

  render() {
    const {item, onCancel} = this.props;
    const isEmpty = containsNoCharacters(item.textUpdate);
    const emptinessLabel = isEmpty ? 'Item name mustn\'t be empty' : null;

    return (
      <div className="input-group">
        <input
          className="form-control"
          defaultValue={item.text}
          onChange={this._onTextChanged}
          placeholder="Type new item name..."
        />
        <div className="input-group-btn">
          <button
            data-balloon={emptinessLabel}
            data-balloon-pos="up"
            className="btn btn-default orange"
            disabled={isEmpty}
            onClick={this._onSaveItem}
          >
            {this._buttonLabel()}
          </button>
          <button
            className="btn btn-default"
            onClick={onCancel}
          >
            Do not...
          </button>
        </div>
      </div>
    );
  }
}
