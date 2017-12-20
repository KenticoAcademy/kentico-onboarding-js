import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { ListItemForm } from '../containers/ListItemForm';
import { ListItemStatic } from '../containers/ListItemStatic';

export interface IListItemDataProps {
  itemNumber: number;
  item: any;
}

interface IListItemState {
  selectionRangeStarts: number;
  selectionRangeEnds: number;
}

export class ListItem extends PureComponent<IListItemDataProps, IListItemState> {
  static displayName = 'ListItem';

  static propTypes = {
    itemNumber: PropTypes.number.isRequired,
    item: PropTypes.shape({
      isBeingEdited: PropTypes.bool.isRequired,
    }),
  };

  constructor(props: IListItemDataProps) {
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
