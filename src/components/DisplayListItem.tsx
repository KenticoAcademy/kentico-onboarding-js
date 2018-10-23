import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import classNames from 'classnames';
import { ItemError } from '../containers/ItemError';
import { Loader } from './Loader';

export type DisplayListItemContainerProps = {
  readonly id: Guid,
  readonly order: number,
  readonly isSyncing: boolean,
};

export type DisplayListItemDispatchProps = {
  readonly enableEditing: () => void,
};

export type DisplayListItemStateProps = {
  readonly text: string,
  readonly hasError: boolean,
};

type DisplayListItemProps = DisplayListItemDispatchProps & DisplayListItemStateProps & DisplayListItemContainerProps;

const displayListItemPropTypes: ValidationMap<DisplayListItemProps> = {
  order: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  enableEditing: PropTypes.func.isRequired,
};

export const DisplayListItem: React.StatelessComponent<DisplayListItemProps> = ({ id, order, text, enableEditing, isSyncing, hasError }): JSX.Element => (
  <li className="list-group-item">
    <HotKeys handlers={{'confirm': enableEditing}}>
      <form className="form-inline" tabIndex={order}>
        <div className="list-item aligner-item" onClick={enableEditing}>
          <div className={classNames('form-group', {'is-syncing': isSyncing})}>
            {order}. {text}
          </div>
          {isSyncing && !hasError && <Loader classNames="aligner-item aligner-item--top col-sm-offset-1" size={6}/>}
          <ItemError id={id} />
        </div>
      </form>
    </HotKeys>
  </li>
);

DisplayListItem.displayName = 'DisplayListItem';
DisplayListItem.propTypes = displayListItemPropTypes;
