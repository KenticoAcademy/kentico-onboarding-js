import './sticky-footer.css';
import React from 'react';
import { Board } from './components/Board';

export const App = () => (
  <div>
    <div className="container">
      <div className="header clearfix">
        <h3 className="text-muted">
          Kentico Academy
        </h3>
      </div>

      <div className="jumbotron">
        <h1>
          JS onboarding
        </h1>
        <p className="lead">
          Let's implement a single page using <a href="https://facebook.github.io/react/docs/hello-world.html"> ReactJS </a>
          and later move on to refactor our app to use <a href="https://facebook.github.io/immutable-js/">Immutable </a>
          and <a href="http://redux.js.org/">Redux</a> and <a href="https://www.typescriptlang.org/">TypeScript</a>.
        </p>
        <p>
          You can find all the relevant info in git repository.
        </p>
        <p>
          <a
            className="btn btn-lg btn-success"
            href="https://github.com/KenticoAcademy/kentico-onboarding-js"
            role="button"
          >
            Fork me on GitHub
          </a>
        </p>
      </div>

      <section id="app-content">
        <Board />
      </section>
    </div>
    <footer className="footer">
      <p>
        &copy; 2018 Kentico software, s.r.o
      </p>
    </footer>
  </div>
);
