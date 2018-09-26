import '../styles/sticky-footer.css';
import * as React from 'react';
import { List } from '../containers/List';
import { HotKeys, KeyMap } from 'react-hotkeys';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';
import { Loader } from './Loader';
import classNames from 'classnames';

const map: KeyMap = {
  'confirm': 'enter',
  'cancelEditing': 'escape',
  'deleteItem': 'ctrl+del',
};

export type AppStateProps = {
  readonly isLoading: boolean,
  readonly error: string,
};

type AppProps = AppStateProps;

const appPropTypes: ValidationMap<AppProps> = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export const App: React.StatelessComponent<AppProps> = ({ isLoading, error }): JSX.Element => {
  const className: string = classNames('', {'aligner aligner-item': isLoading});
  const errorMessage: JSX.Element = (
    <div className="alert alert-danger error-message" role="alert">
      {error}
    </div>
  );

  return (
    <HotKeys keyMap={map}>
      <div className="aligner page">
        <div className="container aligner-item aligner-item--top">
          <div className="header clearfix">
            <h3 className="text-muted">
              Kentico Academy
            </h3>
          </div>
          <section className={className} id="app-content">
            {isLoading ? <Loader /> : <List />}
          </section>
        </div>
        {error !== '' ? errorMessage : undefined}
        <footer className="footer">
          <p>
            &copy; 2017 Kentico software, s.r.o
          </p>
        </footer>
      </div>
    </HotKeys>
  );
};

App.displayName = 'App';
App.propTypes = appPropTypes;
