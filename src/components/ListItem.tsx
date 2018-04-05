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
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
}

export const listItemPropTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    isBeingEdited: PropTypes.bool.isRequired,
  }),
  itemSyncInfo: PropTypes.object.isRequired,
};

export class ListItem extends React.PureComponent<IListItemProps, IListItemState> {
  static displayName = 'ListItem';

  static propTypes = listItemPropTypes;

  constructor(props: IListItemProps) {
    super(props);

    this.state = {
      selectionRangeStarts: 0,
      selectionRangeEnds: 0,
    };
  }

  _selectText = (selectionRangeStarts: number, selectionRangeEnds: number) => {
    this.setState({
      selectionRangeStarts,
      selectionRangeEnds,
    });
  };

  render() {
    return this.props.item.isBeingEdited ?
      <ListItemForm
        { ...this.props }
        selectionRangeEnds={this.state.selectionRangeEnds}
        selectionRangeStarts={this.state.selectionRangeStarts}
      /> :
      <ListItemStatic
        { ...this.props }
        onTextSelection={this._selectText}
      />;
  }
}
