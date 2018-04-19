import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IndexedItem } from '../../../models/IndexedItem';
import { UpdatingItem } from './UpdatingItem';
import { ItemError } from './ItemError';
import { IAction } from '../../../actions/IAction';

export interface IOwnProps {
  readonly item: IndexedItem;
}

export interface IPlainItemDataProps {
  readonly errorMessage: string;
  readonly action: string;
}

export interface IPlainItemCallbackProps {
  readonly onEditStart: () => IAction;
  readonly onCloseError: () => Promise<IAction> | IAction;
  readonly onRetry: () => Promise<IAction>;
}

export type IPlainItemProps = IOwnProps & IPlainItemCallbackProps & IPlainItemDataProps;

export class PlainItem extends React.PureComponent<IPlainItemProps> {
  static propTypes = {
    item: PropTypes.shape({
      index: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onEditStart: PropTypes.func.isRequired,
    onCloseError: PropTypes.func.isRequired
  };

  constructor(props: IPlainItemProps) {
    super(props);
  }

  render(): JSX.Element {
    const {
      item,
      onEditStart,
      errorMessage,
    } = this.props;

    return (
      <div>
        {!item.isSynchronized
          ? <UpdatingItem
            index={item.index}
            text={item.text}
          />
          : <div onClick={onEditStart}>
            {item.index + '. ' + item.text}
            {item.errorId !== null &&
            <ItemError
              errorMessage={errorMessage}
              onCloseError={this._onCloseError}
              onRetry={this._onRetry}
            />}
          </div>
        }
      </div>
    );
  }

  private _onCloseError = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.onCloseError();
  };

  private _onRetry = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.onRetry();
  }
}
