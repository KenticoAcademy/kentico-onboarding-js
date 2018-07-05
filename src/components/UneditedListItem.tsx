import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IItem, Item } from '../models/Item';

export interface IUneditedListItemDataProps {
  item: IItem;
}

export interface IUneditedListItemProps extends IUneditedListItemDataProps {}

const UneditedListItem:
  React.StatelessComponent<IUneditedListItemProps> = ({ item }) => {

  if (item.errorMessage !== '') {
    return (
      <div className="ItemDiv red-text">
        <div className="uneditedItemText">{item.text}</div>
        <div className="uneditedItemMessage">{item.errorMessage}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    );
  }

  return (
    <div className="ItemDiv">
      <div className="uneditedItemText">{item.text}</div>
    </div>
  );
};

UneditedListItem.displayName = 'EditedListItem';

UneditedListItem.propTypes = {
  item: PropTypes.instanceOf(Item),
};

export { UneditedListItem };
