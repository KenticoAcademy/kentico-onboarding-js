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
  React.StatelessComponent<IUneditedListItemProps> = ({ onTextClick, item }) => (
    <div
      className="form-control-static"
      onClick={onTextClick}
    >
      {item.text}
    </div>
  );

UneditedListItem.displayName = 'EditedListItem';

UneditedListItem.propTypes = {
  item: PropTypes.instanceOf(Item),
  onTextClick: PropTypes.func.isRequired,
};

export { UneditedListItem };
