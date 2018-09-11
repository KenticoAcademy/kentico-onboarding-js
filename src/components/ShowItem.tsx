import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IShowItemProps {
  readonly id: string;
  readonly position: number;
  readonly onEditStart: () => void;
}

export interface IShowItemStateProps {
  readonly text: string;
}

export interface IShowItem extends IShowItemProps, IShowItemStateProps { }

export const ShowItem: React.SFC<IShowItem> = (props: IShowItem) => (
  <div
    role="presentation"
    onClick={props.onEditStart}
  >
    {props.position}. {props.text}
  </div>
);

ShowItem.displayName = 'ShowItem';

ShowItem.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  onEditStart: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
