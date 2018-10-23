import * as React from 'react';
import { StaticItem } from '../containers/StaticItem';
import { EditableItem } from '../containers/EditableItem';
import * as PropTypes from 'prop-types';

export interface IItemStateProps {
  readonly id: Uuid;
  readonly index: number;
  readonly isInEditMode: boolean;
}

export const Item: React.StatelessComponent<IItemStateProps> = ({id, index, isInEditMode}: IItemStateProps) =>
  (isInEditMode
    ? (
      <EditableItem
        id={id}
        index={index}
      />
    )
    : (
      <StaticItem
        id={id}
        index={index}
      />
    ));

Item.displayName = 'Item';

Item.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isInEditMode: PropTypes.bool.isRequired,
};
