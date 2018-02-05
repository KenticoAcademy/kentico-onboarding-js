import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IndexedItem } from '../../models/IndexedItem';
import { ItemError } from './ItemError';

interface IPlainItemDataProps {
  readonly item: IndexedItem;
}

export interface IPlainItemCallbackProps {
  readonly onEditStart: () => void;
  readonly onCloseError: () => void;
}

export class PlainItem extends React.PureComponent<IPlainItemCallbackProps & IPlainItemDataProps> {
  static propTypes = {
    item: PropTypes.shape({
      index: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onEditStart: PropTypes.func.isRequired,
  };

  constructor(props: IPlainItemDataProps & IPlainItemCallbackProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      (this.props.item.isSynchronized)
        ? <div onClick={this.props.onEditStart}>
          {this.props.item.index + '. ' + this.props.item.text}
          <ItemError
              errorMessage={this.props.item.errorMessage}
              onCloseError={this._onCloseError}
          />
        </div>
        : <div className="text-warning">
          {this.props.item.index + '. ' + this.props.item.text}
          <span
            className="glyphicon glyphicon-hourglass pull-right"
            aria-hidden="true"
          >
            Updating...
          </span>
        </div>
    );
  }

  private _onCloseError = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.onCloseError();
  };
}
