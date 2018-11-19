import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import { EditListItem } from '../containers/EditListItem';
import { DisplayListItem } from '../containers/DisplayListItem';

export type ListItemContainerProps = {
  readonly id: Guid,
  readonly order: number,
};

export type ListItemStateProps = {
  readonly isBeingEdited: boolean,
  readonly isSyncing: boolean,
  readonly errorId: Guid,
};

type ListItemProps = ListItemStateProps & ListItemContainerProps;

const listItemPropTypes: ValidationMap<ListItemProps> = {
  order: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  errorId: PropTypes.string.isRequired,
};

export const ListItem: React.StatelessComponent<ListItemProps> = ({ order, id, isBeingEdited, isSyncing, errorId}): JSX.Element => {
  const item: JSX.Element =
    isBeingEdited && errorId === '' && !isSyncing
    ? <EditListItem id={id} order={order} />
    : (
      <DisplayListItem
        id={id}
        order={order}
        isSyncing={isSyncing}
      />
    );

  return (
    <li className="list-group-item inline flexbox">
      <div>{order}. </div>
      {item}
    </li>
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = listItemPropTypes;
