import * as React from 'react';
import { createErrorPopup } from '../utils/popups';
import * as PropTypes from 'prop-types';
import { ItemError } from '../models/ItemError';

export interface IItemsErrorsStateProps {
  readonly itemsErrors: ReadonlyArray<ItemError>;
}

export interface IItemsErrorsDispatchProps {
  readonly onItemErrorPopupWasRendered: (id: Uuid) => void;
}

type IItemsErrorsProps = IItemsErrorsStateProps & IItemsErrorsDispatchProps;

export class ItemsErrors extends React.PureComponent<IItemsErrorsProps> {
  static displayName = 'ItemsErrors';

  static propTypes = {
    itemsErrors: PropTypes.arrayOf(PropTypes.instanceOf(ItemError).isRequired).isRequired,
    onItemErrorPopupWasRendered: PropTypes.func.isRequired
  };

  render(): null {
    for (const itemError of this.props.itemsErrors) {
      if (!itemError.wasRendered) {
        createErrorPopup(itemError.errorMessage);
        this.props.onItemErrorPopupWasRendered(itemError.id);
      }
    }

    return null;
  }
}
