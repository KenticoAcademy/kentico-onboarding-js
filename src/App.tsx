import './sticky-footer.css';
import * as React from 'react';
import { PeriodicTicker } from './components/PeriodicTicker';
import { ListWithTimer } from './components/ListWithTimer';

export class App extends React.PureComponent {
  render(): JSX.Element {
    return (
      <div>
        <PeriodicTicker />
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">
              Kentico Academy
            </h3>
          </div>
          <section id="app-content">
            <ListWithTimer />
          </section>
        </div>
        <footer className="footer">
          <p>
            &copy; 2018 Kentico software, s.r.o
          </p>
        </footer>
      </div>
    );
  }
}
