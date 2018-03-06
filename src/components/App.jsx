import '../styles/sticky-footer.css';
import React, { PureComponent } from 'react';
import { List } from '../containers/List';
import { NewItem } from '../containers/NewItem';

export class App extends PureComponent {
  render() {
    return (
      <div>
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">List of ToDos</h3>
          </div>

          <section id="app-content">
            <List />
            <NewItem />
          </section>
        </div>
        <footer className="footer">
          <p>&copy; 2017 Kentico software, s.r.o</p>
        </footer>
      </div>
    );
  }
}
