import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItemStatic } from '../containers/ListItemStatic';
import { IListItem } from '../models/interfaces/IListItem';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { ListItemForm } from './ListItemForm';

export interface IListItemDataProps {
  readonly item: IListItem;
}

export interface IListItemOwnProps {
  readonly itemNumber: number;
  readonly itemSyncInfo: IItemSyncInfo;
}

interface IListItemProps extends IListItemDataProps, IListItemOwnProps {
}

interface IListItemState {
  selectionRangeStarts: number;
  selectionRangeEnds: number;
}

export const listItemPropTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    isBeingEdited: PropTypes.bool.isRequired,
  }),
  itemSyncInfo: PropTypes.object,
};

export class ListItem extends React.PureComponent<IListItemProps, IListItemState> {
  static displayName = 'ListItem';

  static propTypes = listItemPropTypes;

  static defaultProps = {
    itemSyncInfo: undefined,
  };

  constructor(props: IListItemProps) {
    super(props);

    this.state = {
      selectionRangeStarts: 0,
      selectionRangeEnds: 0,
    };
  }

  _selectText = (selectionRangeStarts: number, selectionRangeEnds: number): void => {
    this.setState({
      selectionRangeStarts,
      selectionRangeEnds,
    });
  };

  render() {
    const {
      itemNumber,
      item,
      itemSyncInfo,
    } = this.props;

    return item.isBeingEdited ?
      <ListItemForm
        itemNumber={itemNumber}
        item={item}
        selectionRangeEnds={this.state.selectionRangeEnds}
        selectionRangeStarts={this.state.selectionRangeStarts}
        itemSyncInfo={itemSyncInfo}
      /> :
      <ListItemStatic
        itemNumber={itemNumber}
        item={item}
        onTextSelection={this._selectText}
        itemSyncInfo={itemSyncInfo}
      />;
  }
}
