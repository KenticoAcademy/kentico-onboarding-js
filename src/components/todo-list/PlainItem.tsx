import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IndexedItem } from '../../models/IndexedItem';

interface IPlainItemDataProps {
  readonly item: IndexedItem;
}

export interface IPlainItemCallbackProps {
  readonly onEditStart: () => void;
}

const PlainItem: React.SFC<IPlainItemCallbackProps & IPlainItemDataProps> = (props: IPlainItemCallbackProps & IPlainItemDataProps): JSX.Element =>
  (props.item.isSynchronized)
    ? <div onClick={props.onEditStart}>
      {props.item.index + '. ' + props.item.text}
    </div>
    : <div className="text-warning">
      {props.item.index + '. ' + props.item.text}
      <span
        className="glyphicon glyphicon-hourglass pull-right"
        aria-hidden="true"
      />
    </div>;

PlainItem.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onEditStart: PropTypes.func.isRequired,
};

export { PlainItem }
