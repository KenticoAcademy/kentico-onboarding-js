import '../styles/sticky-footer.css';
import * as React from 'react';
import { HotKeys } from 'react-hotkeys';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';
import { ErrorMessage } from './ErrorMessage';
import { Content } from '../containers/Content';
import { appKeyMap } from './Hotkeys/appKeyMap';

export type AppStateProps = {
  readonly error: string | null,
};

type AppProps = AppStateProps;

const appPropTypes: ValidationMap<AppProps> = {
  error: PropTypes.string,
};

export const App: React.FunctionComponent<AppProps> = ({ error }) => (
  <HotKeys keyMap={appKeyMap}>
    <div className="aligner page">
      <div className="container aligned-item aligned-item--top">
        <div className="header clearfix">
          <h3 className="text-muted">
            Kentico Academy
          </h3>
        </div>
        <Content />
      </div>
      {error && (
        <ErrorMessage
          classNames="alert alert-danger error-message"
          error={error}
        />
      )}
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
