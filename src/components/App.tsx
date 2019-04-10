import '../styles/sticky-footer.css';
import * as React from 'react';
import { List } from '../containers/list/List';

export const App: React.StatelessComponent = () => (
  <div>
    <div className="container mt-4">
      <section id="app-content">
        <List />
      </section>
    </div>
    <footer className="footer">
      <p>
        &copy; 2017 Kentico software, s.r.o
      </p>
    </footer>
  </div>
);

App.displayName = 'App';
