import * as React from 'react';
import { HotKeys } from 'react-hotkeys';
import { keyMap } from '../constants/keys';
import { Items } from '../containers/Items';
import { NewItemForm } from '../containers/NewItemForm';
import {
  AllFetchItemsStates,
  FetchItemsState,
} from '../models/enums/FetchItemsState';
import * as PropTypes from 'prop-types';
import { Loader } from './Loader';
import { IAction } from '../models/interfaces/IAction';
import { RetryList } from '../containers/RetryList';

export interface IListDataProps {
  readonly fetchItemsState: FetchItemsState;
}

export interface IListCallbackProps {
  readonly fetchItems: (uri: string) => Promise<IAction>;
}

interface IListProps extends IListDataProps, IListCallbackProps {
}

const fetchItemsUri = '/api/v1/listItems';

export class List extends React.PureComponent<IListProps> {
  static displayName = 'List';

  static propTypes = {
    fetchItemsState: PropTypes.oneOf(AllFetchItemsStates),
    fetchItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchItems(fetchItemsUri);
  }

  render() {
    switch (this.props.fetchItemsState) {
      case FetchItemsState.REQUESTED:
        return <Loader />;

      case FetchItemsState.RECEIVED:
        return <HotKeys keyMap={keyMap}>
          <ol className="list-group">
            <Items />

            <li className="list-group-item">
              <NewItemForm />
            </li>
          </ol>
        </HotKeys>;

      case FetchItemsState.FAILED:
        return <RetryList uri={fetchItemsUri} />;

      default:
        return null;
    }
  }
}
