import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IListItem } from '../models/IListItem';

export interface IListItemStaticCallbackProps {
  readonly onItemOpened: (uri: string) => void;
}

interface IListItemStaticProps extends IListItemStaticCallbackProps {
  readonly item: IListItem;
  readonly itemNumber: number;
  readonly onTextSelection: (startOffset: number, endOffset: number) => void;
}

export class ListItemStatic extends React.PureComponent<IListItemStaticProps> {
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
    onItemOpened('/api/v1/listItems/');
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
