import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../../containers/Items/EditedListItem';
import { ItemErrorMessage } from '../../containers/Items/ItemErrorMessage';
import { UneditedListItem } from '../../containers/Items/UneditedListItem';
import { Markers } from '../../containers/Markers/Markers';
import { Item } from '../../models/Item';
import * as classNames from 'classnames';
import {IAction} from '../../actions/IAction';
import {IListItemContainerProps} from '../../containers/Items/ListItem';

export interface IListItemStateProps {
  item: Item;
  index: number;
  synchronizing: boolean;
  errorsNotEmpty: boolean;
}

export interface IListItemDispatchProps {
  onClick: () => IAction;
}

type IListItemProps = IListItemStateProps & IListItemDispatchProps & IListItemContainerProps;

export class ListItem extends React.PureComponent<IListItemProps> {

  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.instanceOf(Item),
    index: PropTypes.number.isRequired,
    synchronizing: PropTypes.bool.isRequired,
    errorsNotEmpty: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  _showEditedItem = (): void => {
    if (!this.props.item.isBeingEdited) {
      this.props.onClick();
    }
  };

  render() {
    const listItemClassName = classNames({
      'list__item': true,
      'item--synchronizing': this.props.synchronizing,
      'item--error': this.props.errorsNotEmpty,
      'item--deleted': this.props.item.isBeingDeleted,
    });

    return (
      <div className={listItemClassName}>
      <div
        onClick={this._showEditedItem}
        className="list__item_content--long"
        key={this.props.item.id}
      >
        <div className="list__item__inline_content">
          {this.props.index + 1}.&nbsp;
        </div>
        {this.props.item.isBeingEdited ?
          <EditedListItem itemId={this.props.item.id} />
          : <UneditedListItem itemId={this.props.item.id} />
        }
      </div>
      <ItemErrorMessage itemId={this.props.item.id} />
      <Markers id={this.props.item.id} />
    </div>)
  }
}
