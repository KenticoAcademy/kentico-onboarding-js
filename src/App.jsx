import './sticky-footer.css';
import React, { PureComponent } from 'react';
import { List } from './components/List';

export class App extends PureComponent {
  render() {
    return (
      <div>
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">
              Kentico Academy
            </h3>
          </div>

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
  }
}
