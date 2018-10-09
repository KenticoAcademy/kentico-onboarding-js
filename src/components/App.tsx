import '../styles/sticky-footer.css';
import * as React from 'react';
import { HotKeys, KeyMap } from 'react-hotkeys';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';
import { ErrorMessage } from './ErrorMessage';
import { Content } from '../containers/Content';

const map: KeyMap = {
  'confirm': 'enter',
  'cancelEditing': 'escape',
  'deleteItem': 'ctrl+del',
};

export type AppStateProps = {
  readonly error: string,
};

type AppProps = AppStateProps;

const appPropTypes: ValidationMap<AppProps> = {
  error: PropTypes.string.isRequired,
};

export const App: React.StatelessComponent<AppProps> = ({ error }): JSX.Element => (
  <HotKeys keyMap={map}>
    <div className="aligner page">
      <div className="container aligner-item aligner-item--top">
        <div className="header clearfix">
          <h3 className="text-muted">
            Kentico Academy
          </h3>
        </div>
        <Content />
      </div>
      <ErrorMessage
        classNames="alert alert-danger error-message"
        error={error}
        tooltip={''}
      />
      <footer className="footer">
        <p>
          &copy; 2017 Kentico software, s.r.o
        </p>
      </footer>
    </div>
  </HotKeys>
);

App.displayName = 'App';
App.propTypes = appPropTypes;
