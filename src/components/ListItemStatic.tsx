import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { IListItem } from '../models/IListItem';
import { IAction } from '../interfaces/IAction';

interface IListItemStaticCallbackProps {
  onTextSelection: (startOffset: number, endOffset: number) => void;
  onItemOpened: () => IAction;
}

interface IListItemStaticDataProps {
  itemNumber: number;
  item: IListItem;
}

export interface IListItemStaticProps extends IListItemStaticCallbackProps, IListItemStaticDataProps { }

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

  _onTextSelection = () => {
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
