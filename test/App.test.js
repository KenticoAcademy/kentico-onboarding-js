import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/App.jsx';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
