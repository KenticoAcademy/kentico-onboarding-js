import '../styles/sticky-footer.css';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ShortcutManager } from 'react-shortcuts';

import { List } from '../containers/List';
import { keymap } from '../constants/keymap';

const shortcutManager = new ShortcutManager(keymap);

export class App extends PureComponent {
  static childContextTypes = {
    shortcuts: PropTypes.object.isRequired,
  };

  getChildContext() {
    return { shortcuts: shortcutManager };
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">List of ToDos</h3>
          </div>

          <section id="app-content">
            <List />
          </section>
        </div>
        <footer className="footer">
          <p>&copy; 2017 Kentico software, s.r.o</p>
        </footer>
      </div>
    );
  }
}
