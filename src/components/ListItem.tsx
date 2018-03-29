// components/ListItem.jsx

import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ListItemEditor } from '../containers/ListItemEditor';
import { ListItemDisplay } from '../containers/ListItemDisplay';
import { IItemViewModel } from '../models/IItemViewModel';

export interface IListItemStateProps {
  readonly item: IItemViewModel;
}

export const ListItem: React.StatelessComponent<IListItemStateProps>
  = ({ item }) => (
  item.isBeingEdited ?
    <ListItemEditor
      item={item}
    /> :
    <ListItemDisplay
      item={item}
    />
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.shape({
    isBeingEdited: PropTypes.bool,
  }).isRequired,
};
