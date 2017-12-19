import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { keyMap } from '../constants/keys';
import { Items } from '../containers/Items';
import { NewItemForm } from '../containers/NewItemForm';

const List = () => (
  <HotKeys keyMap={keyMap}>
    <ol className="list-group">
      <Items />

      <li className="list-group-item">
        <NewItemForm />
      </li>
    </ol>
  </HotKeys>
);


List.displayName = 'List';

export { List };
