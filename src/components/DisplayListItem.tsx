import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import classNames from 'classnames';
import { ItemError } from '../containers/ItemError';

export type DisplayListItemContainerProps = {
  readonly id: Guid,
  readonly order: number,
  readonly isSyncing: boolean,
  readonly errorId: Guid,
};

export type DisplayListItemDispatchProps = {
  readonly enableEditing: () => void,
};

export type DisplayListItemStateProps = {
  readonly text: string,
};

type DisplayListItemProps = DisplayListItemDispatchProps & DisplayListItemStateProps & DisplayListItemContainerProps;

const displayListItemPropTypes: ValidationMap<DisplayListItemProps> = {
  order: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  errorId: PropTypes.string.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  enableEditing: PropTypes.func.isRequired,
};

export const DisplayListItem: React.StatelessComponent<DisplayListItemProps> = ({ id, errorId, order, text, enableEditing, isSyncing }): JSX.Element => (
  <li className="list-group-item">
    <HotKeys handlers={{'confirm': enableEditing}}>
      <form className="form-inline" tabIndex={order}>
        <div className="list-item aligner-item" onClick={enableEditing}>
          <div className={classNames('form-group', {'is-syncing': isSyncing})}>
            {order}. {text}
          </div>
          <ItemError id={id} errorId={errorId} />
        </div>
      </form>
    </HotKeys>
  </li>
);

DisplayListItem.displayName = 'DisplayListItem';
DisplayListItem.propTypes = displayListItemPropTypes;