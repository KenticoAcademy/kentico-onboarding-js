import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { IListItem } from '../models/IListItem';
import { IAction } from '../models/IAction';

export interface IListItemStaticCallbackProps {
  onItemOpened: () => IAction;
}

interface IListItemStaticProps extends IListItemStaticCallbackProps {
  item: IListItem;
  itemNumber: number;
  onTextSelection: (startOffset: number, endOffset: number) => void;
}

export class ListItemStatic extends PureComponent<IListItemStaticProps> {
  static displayName = 'ListItemStatic';

  static propTypes = {
    onTextSelection: PropTypes.func.isRequired,
    onItemOpened: PropTypes.func.isRequired,
    itemNumber: PropTypes.number.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  };

  _onTextSelection = (): void => {
    const selection = window
      .getSelection()
      .getRangeAt(0);

    const { startOffset, endOffset } = selection;
    const {onTextSelection, onItemOpened } = this.props;

    onTextSelection(startOffset, endOffset);
    onItemOpened();
  };

  render() {
    const {
      itemNumber,
      item: { text },
    } = this.props;

    return (
      <div onMouseUp={this._onTextSelection}>
        {itemNumber + '. '}
        {text}
      </div>
    );
  }
}
