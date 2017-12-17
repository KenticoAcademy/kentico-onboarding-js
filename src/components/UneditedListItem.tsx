import * as PropTypes from 'prop-types';
import * as React from 'react';
import { EventHandler } from 'react';

export interface IUneditedListItemDataProps {
  itemText: string;
}

export interface IUneditedListItemCallbackProps {
  onTextClick: EventHandler<any>;
}

const UneditedListItem: React.SFC<IUneditedListItemDataProps & IUneditedListItemCallbackProps> = ({ onTextClick, itemText }:
       IUneditedListItemDataProps & IUneditedListItemCallbackProps): JSX.Element => {
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

