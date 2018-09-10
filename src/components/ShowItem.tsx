import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IShowItemProps {
  position: number;
  text: string;
  onEditStart: () => void;
}

export const ShowItem: React.SFC<IShowItemProps> = (props) => (
  <div
    role="presentation"
    onClick={props.onEditStart}
  >
    {props.position}. {props.text}
  </div>
);

ShowItem.displayName = 'ShowItem';

ShowItem.propTypes = {
  position: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onEditStart: PropTypes.func.isRequired,
};
