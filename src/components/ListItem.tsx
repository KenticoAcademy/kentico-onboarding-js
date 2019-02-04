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
  readonly showEditForm: boolean,
};

type ListItemProps = ListItemStateProps & ListItemContainerProps;

const listItemPropTypes: ValidationMap<ListItemProps> = {
  order: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  showEditForm: PropTypes.bool.isRequired,
};

export const ListItem: React.FunctionComponent<ListItemProps> = ({ order, id, showEditForm}) => {
  const item =
    showEditForm
    ? <EditListItem id={id} />
    : <DisplayListItem id={id} />;

  return (
    <li className="list-group-item inline flexbox">
      <div>{order}. </div>
      {item}
    </li>
  );
};

ListItem.displayName = 'ListItem';
ListItem.propTypes = listItemPropTypes;
