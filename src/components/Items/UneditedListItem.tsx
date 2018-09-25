import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  IItem,
  Item
} from '../../models/Item';
import { IAction } from '../../actions/IAction';

export interface IUneditedListItemDataProps {
  item: IItem;
}

export interface IUneditedListItemCallbackProps {
  onClick: () => IAction;
}

type IUneditedListItemProps = IUneditedListItemDataProps & IUneditedListItemCallbackProps;

const UneditedListItem:
  React.StatelessComponent<IUneditedListItemProps> = ({item, onClick}) => {

  const _showEditedItem = () => {
    if (!item.isBeingDeleted) {
      onClick();
    }
  };

  if (item.errorMessages.size !== 0) {
    return (
      <div
        className="list__item__inline_content"
        onClick={_showEditedItem}
      >
        {item.text}
      </div>
    );
  }

  return (
    <div
      className="list__item__inline_content"
      onClick={onClick}
    >
      {item.text}
    </div>
  );
};

UneditedListItem.displayName = 'UneditedListItem';

UneditedListItem.propTypes = {
  item: PropTypes.instanceOf(Item).isRequired,
  onClick: PropTypes.func.isRequired,
};

export { UneditedListItem };
