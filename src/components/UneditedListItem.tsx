import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IItem, Item } from '../models/Item';

export interface IUneditedListItemDataProps {
  item: IItem;
}

export interface IUneditedListItemCallbackProps {
  onTextClick: React.MouseEventHandler<HTMLDivElement>;
}
export interface IUneditedListItemProps extends IUneditedListItemDataProps, IUneditedListItemCallbackProps {}

const UneditedListItem:
  React.StatelessComponent<IUneditedListItemProps> = ({ onTextClick, item }) => {

  if (item.errorMessage) {
    return (
      <div
        className="ItemDiv"
        onClick={onTextClick}
      >
        <div className="uneditedItemText">{item.text}</div>
        <div className="uneditedItemMessage">{item.errorMessage}</div>
      </div>
    );
  }
  if (!item.synchronized) {
    return (
      <div
        className="ItemDiv"
      >
        <div className="uneditedItemText">{item.text}</div>
        <img className="uneditedItemMessage" src="https://loading.io/spinners/bluecat/lg.blue-longcat-spinner.gif" height="20px"/>
      </div>
    );
  }
  return (
    <div
      className="form-control-static"
      onClick={onTextClick}
    >
      {item.text}
    </div>
  );

};

UneditedListItem.displayName = 'EditedListItem';

UneditedListItem.propTypes = {
  item: PropTypes.instanceOf(Item),
  onTextClick: PropTypes.func.isRequired,
};

export { UneditedListItem };
