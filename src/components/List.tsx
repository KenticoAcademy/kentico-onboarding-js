import * as React from 'react';
import { HotKeys } from 'react-hotkeys';
import { keyMap } from '../constants/keys';
import { Items } from '../containers/Items';
import { NewItemForm } from '../containers/NewItemForm';
import { FetchItemsState } from '../models/FetchItemsState';
import * as PropTypes from 'prop-types';
import { IAction } from '../models/IAction';

export interface IListDataProps {
  readonly fetchItemsState: FetchItemsState;
}

export interface IListCallbackProps {
  readonly fetchItems: (uri: string) => IAction;
}

interface IListProps extends  IListDataProps, IListCallbackProps {}

export class List extends React.PureComponent<IListProps> {
  static displayName = 'List';

  static propTypes = {
    fetchItemsState: PropTypes.number.isRequired,
    fetchItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchItems('/api/v1/listItems');
  }

  render() {
    return this.props.fetchItemsState === FetchItemsState.REQUESTED ?
      (
        <h1>IS FETCHING!</h1>
      ) :
      (
        <HotKeys keyMap={keyMap}>
          <ol className="list-group">
            <Items />

            <li className="list-group-item">
              <NewItemForm />
            </li>
          </ol>
        </HotKeys>
      );
  }
}
