import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IItem, Item } from '../models/Item';
import { IAction } from '../actions/IAction';

export interface IUneditedListItemDataProps {
  item: IItem;
}

export interface IUneditedListItemCallbackProps {
  onThrowAway: () => Promise<IAction>;
  onSaveAgain: () => Promise<IAction>;
}

export interface IUneditedListItemProps extends IUneditedListItemDataProps {}

const UneditedListItem:
  React.StatelessComponent<IUneditedListItemProps & IUneditedListItemCallbackProps> = ({ item, onThrowAway, onSaveAgain }) => {

  if (item.errorMessage) {
    return (
      <div
        className="ItemDiv red-text"
      >
        <div className="uneditedItemText">{item.text}</div>
        <div
          data-balloon={'Let this shark eat this item'}
          data-balloon-pos="up"
          className="uneditedItemMessage"
          onClick={onThrowAway}>
          🦈
        </div>
        <div
          data-balloon={'Try again'}
          data-balloon-pos="up"
          className="uneditedItemMessage"
          onClick={onSaveAgain}>
          &#x21ba;&nbsp;&nbsp;&nbsp;
        </div>
        <div className="uneditedItemMessage">Here is error message&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    );
  }

  return (
    <div
      className="ItemDiv"
    >
      <div className="uneditedItemText">{item.text}</div>
      <div
        data-balloon={'Let this shark eat this item'}
        data-balloon-pos="up"
        className="uneditedItemMessage"
        onClick={onThrowAway}>
        🦈
      </div>
      <div className="uneditedItemMessage">{item.errorMessage}</div>
    </div>
  );
};

UneditedListItem.displayName = 'EditedListItem';

UneditedListItem.propTypes = {
  item: PropTypes.instanceOf(Item),
  onThrowAway: PropTypes.func.isRequired,
  onSaveAgain: PropTypes.func.isRequired,
};

export { UneditedListItem };
