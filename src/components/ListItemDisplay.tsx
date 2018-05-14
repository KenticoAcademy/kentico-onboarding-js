import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actions/types/IAction';
import { IItemViewModel } from '../models/IItemViewModel';

export interface IListItemDisplayOriginalProps {
  readonly item: IItemViewModel;
}

export interface IListItemDisplayDispatchProps {
  readonly onEdit: () => IAction;
}

interface IListItemDisplayProps extends IListItemDisplayDispatchProps, IListItemDisplayOriginalProps {}

export const ListItemDisplay: React.StatelessComponent<IListItemDisplayProps>
  = ({ item: { value, bullet }, onEdit }) => (
  <div onClick={onEdit}>
    {bullet}.&nbsp;
    {value}
  </div>
);

ListItemDisplay.displayName = 'ListItemDisplay';

ListItemDisplay.propTypes = {
  item: PropTypes.shape({
    bullet: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,

  onEdit: PropTypes.func.isRequired,
};
