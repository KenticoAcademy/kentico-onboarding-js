import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  IItem,
  Item
} from '../models/Item';
import { IAction } from '../actions/IAction';

export interface IUneditedListItemDataProps {
  item: IItem;
}

export interface IUneditedListItemCallbackProps {
  onClick: () => IAction;
}

type IUneditedListItemProps = IUneditedListItemDataProps & IUneditedListItemCallbackProps;

const UneditedListItem:
  React.StatelessComponent<IUneditedListItemProps> = ({item, onClick}) => {

  if (item.errorMessages.size !== 0) {
    return (
      <div
        className="ItemDiv red-text"
        onClick={onClick}
      >
        <div className="uneditedItemText">{item.text}</div>
        <div className="uneditedItemMessage">{item.errorMessages.valueSeq()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    );
  }

  return (
    <div
      className="ItemDiv"
      onClick={onClick}
    >
      <div className="uneditedItemText">{item.text}</div>
    </div>
  );
};

UneditedListItem.displayName = 'EditedListItem';

UneditedListItem.propTypes = {
  item: PropTypes.instanceOf(Item).isRequired,
  onClick: PropTypes.func.isRequired,
};

export { UneditedListItem };
