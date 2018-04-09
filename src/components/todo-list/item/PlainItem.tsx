import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IndexedItem } from '../../../models/IndexedItem';
import { UpdatingItem } from './UpdatingItem';
import { defaultId } from '../../../utils/generateId';
import { ItemError } from './ItemError';

interface IPlainItemDataProps {
  readonly item: IndexedItem;
}

export interface IPlainItemCallbackProps {
  readonly onEditStart: () => void;
}

export class PlainItem extends React.PureComponent<IPlainItemCallbackProps & IPlainItemDataProps> {
  static propTypes = {
    item: PropTypes.shape({
      index: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    onEditStart: PropTypes.func.isRequired,
    onCloseError: PropTypes.func.isRequired
  };

  constructor(props: IPlainItemDataProps & IPlainItemCallbackProps) {
    super(props);
  }

  render(): JSX.Element {
    const {item, onEditStart} = this.props;
    return (
      <div>
        {!item.isSynchronized
          ? <UpdatingItem
            index={item.index}
            text={item.text}
          />
          : <div onClick={onEditStart}>
            {item.index + '. ' + item.text}
            {item.errorId !== defaultId &&
            <ItemError
              errorMessage=""
              onCloseError={() => console.log('')}
            />}
          </div>
        }
      </div>
    );
  }
}
