import './sticky-footer.css';
import './balloon.css';
import React from 'react';
import { List } from './containers/List';
import { AddNewItem } from './containers/AddNewItem.ts';

export const App = () => (
  <div>
    <div className="container">
      <div className="header clearfix">
        <h3 className="text-muted">Kentico Academy</h3>
      </div>

      <div className="jumbotron">
        <h1>JS onboarding</h1>
        <p className="lead">
          We will implement simple task using
          <a href="https://facebook.github.io/react/docs/hello-world.html">ReactJS</a> and later move on to refactor our app to use
          <a href="https://facebook.github.io/immutable-js/">Immutable</a> and <a href="http://redux.js.org/">Redux</a>.
        </p>
        <p>You can find all the relevant info in git repository.</p>
        <p>
          <a className="btn btn-lg btn-success" href="https://github.com/Suzii/kentico-onboarding-js" role="button">Fork me on GitHub</a>
        </p>
      </div>

      <section id="app-content">
        <div className="row">
          <div className="col-sm-8">
            <List />
            <AddNewItem />
          </div>
        </div>
      </section>

    </div>
    <footer className="footer">
      <p>&copy; 2017 Kentico software, s.r.o</p>
    </footer>
  </div>
);
