import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItemForm } from '../containers/ListItemForm';
import { ListItemStatic } from '../containers/ListItemStatic';
import { ListItem as ListItemModel } from '../models/classes/ListItem';

export interface IListItemDataProps {
  readonly item: ListItemModel;
}

interface IListItemProps extends IListItemDataProps {
  readonly itemNumber: number;
}

interface IListItemState {
  selectionRangeStarts: number;
  selectionRangeEnds: number;
}

export class ListItem extends React.PureComponent<IListItemProps, IListItemState> {
  static displayName = 'ListItem';

  static propTypes = {
    itemNumber: PropTypes.number.isRequired,
    item: PropTypes.shape({
      isBeingEdited: PropTypes.bool.isRequired,
    }),
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
    } = this.props;

    return item.isBeingEdited ?
      <ListItemForm
        itemNumber={itemNumber}
        item={item}
        selectionRangeStarts={this.state.selectionRangeStarts}
        selectionRangeEnds={this.state.selectionRangeEnds}
      /> :
      <ListItemStatic
        itemNumber={itemNumber}
        item={item}
        onTextSelection={this._selectText}
      />;
  }
}
