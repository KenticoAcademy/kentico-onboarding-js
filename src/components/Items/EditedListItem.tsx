import * as React from 'react';
import * as PropTypes from 'prop-types';
import {IAction} from '../../actions/IAction';
import {IItem, Item} from '../../models/Item';
import {alertTypes} from '../../constants/alert/alertTypes';
import {alertMessages} from '../../constants/alert/alertMessages';
import {IEditListItemContainerProps} from '../../containers/Items/EditedListItem';
import {getItemButtonLabel} from '../../utils/getItemButtonLabel';
import {assertAlert} from '../../utils/assertAlert';


export interface IEditedListItemStateProps {
  item: IItem;
  isEmpty: boolean;
}

export interface IEditedListItemDispatchProps {
  onCancel: () => IAction;
  onSave: (textUpdate: string) => Promise<IAction>;
  textUpdateChange: (textUpdate: string) => IAction;
}

type IEditedListItemProps = IEditListItemContainerProps & IEditedListItemStateProps & IEditedListItemDispatchProps;

export class EditedListItem extends React.PureComponent<IEditedListItemProps> {

  static displayName = 'EditedListItem';

  static propTypes = {
    item: PropTypes.instanceOf(Item),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    textUpdateChange: PropTypes.func.isRequired,
  };

  _onSaveItem = (): void => {
    const {onSave, item} = this.props;
    onSave(item.textUpdate)
      .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.UPDATE_SUCCESS))
      .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPDATE_ERROR));
  };

  _onTextChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.textUpdateChange(e.target.value);
  };

  render() {
    const emptinessLabel = this.props.isEmpty ? 'Item name mustn\'t be empty' : null;

    return (<div className="list__item__inline_content--long">
      <input
        className="input__edit_text"
        defaultValue={this.props.item.text}
        onChange={this._onTextChanged}
        placeholder="Type new item name..."
      />
      <button
        data-balloon={emptinessLabel}
        data-balloon-pos="up"
        className="default_button"
        disabled={this.props.isEmpty}
        onClick={this._onSaveItem}
      >
        {getItemButtonLabel(this.props.item)}
      </button>
      <button
        className="default_button"
        onClick={this.props.onCancel}
      >
        Do not...
      </button>
    </div>);
  }
}
