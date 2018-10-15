import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  IItem,
  Item
} from '../../models/Item';

export interface IUneditedListItemStateProps {
  item: IItem;
}

const UneditedListItem:

  React.StatelessComponent<IUneditedListItemStateProps> = ({item}) => (
    <div className="list__item__inline_content">
      {item.text}
    </div>);

UneditedListItem.displayName = 'UneditedListItem';

UneditedListItem.propTypes = {
  item: PropTypes.instanceOf(Item).isRequired,
};

export { UneditedListItem };
