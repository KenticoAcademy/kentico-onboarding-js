import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItemStatic } from '../containers/ListItemStatic';
import { ListItemForm } from '../containers/ListItemForm';
import { Uuid } from '../models/Uuid';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';

export interface IListItemDataProps {
  readonly isBeingEdited: boolean;
}

export interface IListItemOwnProps {
  readonly itemNumber: number;
  readonly itemId: Uuid;
  readonly itemSyncInfo: IItemSyncInfo;
}

interface IListItemProps extends IListItemDataProps, IListItemOwnProps {}

interface IListItemState {
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
}

export const listItemSharedPropTypes = {
  itemNumber: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
  itemSyncInfo: PropTypes.object.isRequired,
};

export class ListItem extends React.PureComponent<IListItemProps, IListItemState> {
  static displayName = 'ListItem';

  static propTypes = {
    ...listItemSharedPropTypes,
    isBeingEdited: PropTypes.bool.isRequired,
  };

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
    const { isBeingEdited, ...props } = this.props;

    return isBeingEdited
      ? <ListItemForm
        { ...props }
        selectionRangeEnds={this.state.selectionRangeEnds}
        selectionRangeStarts={this.state.selectionRangeStarts}
      />
      : <ListItemStatic
        { ...props }
        onTextSelection={this._selectText}
      />;
  }
}
