import * as PropTypes from 'prop-types';
import * as React from 'react';

export interface IUneditedListItemDataProps {
  itemText: string;
}

export interface IUneditedListItemCallbackProps {
  onTextClick: React.MouseEventHandler<HTMLDivElement>;
}
export interface IUneditedListItemProps extends IUneditedListItemDataProps, IUneditedListItemCallbackProps {}

const UneditedListItem:
  React.StatelessComponent<IUneditedListItemProps> = ({ onTextClick, itemText }) => {
  return(
    <div
      className="form-control-static"
      onClick={onTextClick}
    >
      {itemText}
    </div>
  );
};

UneditedListItem.displayName = 'EditedListItem';

UneditedListItem.propTypes = {
  itemText: PropTypes.string.isRequired,
  onTextClick: PropTypes.func.isRequired,
};

export { UneditedListItem };
