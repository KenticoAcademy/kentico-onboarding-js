import * as React from 'react';
import * as PropTypes from 'prop-types';
import { containsNoCharacters } from '../utils/containsNoCharacters';
import { IAction } from '../actions/IAction';
import { IItem, Item } from '../models/Item';
import { ItemId } from '../models/ItemId';

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
    const {onSave, item } = this.props;
    onSave(item.textUpdate);
  };

  _onTextChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const textUpdate = e.target.value;
    const { textUpdateChange } = this.props;
    textUpdateChange(textUpdate);
  };

  render() {
    const { item, onCancel } = this.props;
    const isEmpty = containsNoCharacters(item.textUpdate);

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
            data-balloon={isEmpty ? 'Item name mustn\'t be empty' : null}
            data-balloon-pos="up"
            className="btn btn-default orange"
            disabled={isEmpty}
            onClick={this._onSaveItem}
          >
            {item.errorMessages.keySeq().contains('UPLOAD') ?
              'Modify the word you wanted to upload!' : item.errorMessages.size !== 0 ?
                'Save the word again!' : 'Save the word!'}
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
