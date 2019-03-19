import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ValidationMap } from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import classNames from 'classnames';
import { ItemError } from '../containers/ItemError';
import { Loader } from './Loader';
import { PureComponent } from 'react';

export type DisplayListItemContainerProps = {
  readonly id: Guid,
};

export type DisplayListItemDispatchProps = {
  readonly enableEditing: () => void,
};

export type DisplayListItemStateProps = {
  readonly text: string,
  readonly showLoader: boolean,
  readonly isSyncing: boolean,
};

type DisplayListItemProps = DisplayListItemDispatchProps & DisplayListItemStateProps & DisplayListItemContainerProps;

export class DisplayListItem extends PureComponent<DisplayListItemProps> {
  static displayName = 'DisplayListItem';

  static propTypes: ValidationMap<DisplayListItemProps> = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isSyncing: PropTypes.bool.isRequired,
    showLoader: PropTypes.bool.isRequired,
    enableEditing: PropTypes.func.isRequired,
  };

  private _enableEditing = (): void => {
    if (!this.props.isSyncing) {
      this.props.enableEditing();
    }
  };

  render(): JSX.Element {
    const { isSyncing, showLoader, id, text } = this.props;

    return (
      <HotKeys handlers={{ confirm: this._enableEditing }}>
        <div className="form-inline" tabIndex={0}>
          <div className="list-item aligned-item" onClick={this._enableEditing}>
            <div className={classNames('form-group', {'is-syncing': isSyncing})}>
              {text}
            </div>
            {showLoader && (
              <Loader
                className="aligned-item aligned-item--top col-sm-offset-1"
                size={6}
              />
            )}
            <ItemError id={id} />
          </div>
        </div>
      </HotKeys>
    );
  }
}
