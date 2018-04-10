import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IndexedItem } from '../../../models/IndexedItem';
import { UpdatingItem } from './UpdatingItem';
import { ItemError } from './ItemError';

interface IOwnProps {
  readonly item: IndexedItem;
}

export interface IPlainItemDataProps {
  readonly errorMessage: string;
}

export interface IPlainItemCallbackProps {
  readonly onEditStart: () => void;
  readonly onCloseError: () => void;
}

export class PlainItem extends React.PureComponent<IPlainItemDataProps & IPlainItemCallbackProps & IOwnProps> {
  static propTypes = {
    item: PropTypes.shape({
      index: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onEditStart: PropTypes.func.isRequired,
    onCloseError: PropTypes.func.isRequired
  };

  constructor(props: IOwnProps & IPlainItemDataProps & IPlainItemCallbackProps) {
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
            {console.log(item.errorId, errorMessage)}
            {item.errorId !== null &&
            <ItemError
              errorMessage={errorMessage}
              onCloseError={this._onCloseError}
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
}
