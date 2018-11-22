import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

export interface IShowItemOwnProps {
  readonly id: Guid;
  readonly position: number;
}

export interface IShowItemStateProps {
  readonly text: string;
}

export interface IShowItemDispatchStateProps {
  readonly onEditStart: () => void;
}

type IShowItem = IShowItemOwnProps & IShowItemStateProps & IShowItemDispatchStateProps;

export const ShowItem: React.StatelessComponent<IShowItem> = (props: IShowItem) => {
  const startEditShortcut = (event: KeyboardEvent): void => {
    event.preventDefault();
    props.onEditStart();
  };

  const handlers: { [key: string]: (keyEvent?: KeyboardEvent) => void } = { 'enter': startEditShortcut,
  };

  return (
    <HotKeys handlers={handlers}>
      <div
        role="presentation"
        onClick={props.onEditStart}
        tabIndex={0}
      >
        {props.position}. {props.text}
      </div>
    </HotKeys>
  );
};

ShowItem.displayName = 'ShowItem';

ShowItem.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  onEditStart: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
