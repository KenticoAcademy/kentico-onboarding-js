import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IItem, Item } from '../models/Item';

export interface IUneditedListItemDataProps {
  item: IItem;
}

export interface IUneditedListItemProps extends IUneditedListItemDataProps {}

const UneditedListItem:
  React.StatelessComponent<IUneditedListItemProps> = ({ item }) => {

  if (item.errorMessage) {
    return (
      <div
        className="ItemDiv"
      >
        <div className="uneditedItemText">{item.text}</div>
        <div className="uneditedItemMessage">{item.errorMessage}</div>
      </div>
    );
  }

  return (
      <div
        className="form-control-static"
      >
        {item.text}
      </div>
    );
};

UneditedListItem.displayName = 'EditedListItem';

UneditedListItem.propTypes = {
  item: PropTypes.instanceOf(Item),
};

export { UneditedListItem };
