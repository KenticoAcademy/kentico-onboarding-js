import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { keyMap } from '../constants/keys';
import { ItemsContainer } from '../containers/ItemsContainer';
import { NewItemForm } from './NewItemForm';

const propTypes = {
  onAddNewItem: PropTypes.func.isRequired,
};

const List = ({ onAddNewItem }) => (
  <HotKeys keyMap={keyMap}>
    <ol className="list-group">
      <ItemsContainer />

      <li className="list-group-item">
        <NewItemForm onSubmit={onAddNewItem} />
      </li>
    </ol>
  </HotKeys>
);


List.displayName = 'List';
List.propTypes = propTypes;

export { List };
