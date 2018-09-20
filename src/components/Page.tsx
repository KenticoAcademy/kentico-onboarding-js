import * as React from 'react';
import { AddNewItem } from '../containers/AddNewItem';
import { List } from '../containers/List';

const Page: React.StatelessComponent = () => (
  <div>
    <AddNewItem />
    <div className="list__container">
      <List />
    </div>
  </div>
);

Page.displayName = 'Page';

export { Page };
