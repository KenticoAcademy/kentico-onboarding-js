import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ItemToAdd } from '../containers/ItemToAdd';
import { TodoListItem } from '../containers/TodoListItem';
import { ReactNodeArray } from 'react';
import { PacmanLoader } from 'react-spinners';


export type TodoListStateProps = {
  readonly isFetchingAll: boolean,
  readonly hasError: boolean,
  readonly itemIds: Array<Guid>,
};

export type TodoListDispatchProps = {
  readonly reloadAll: () => void,
};

export type TodoListProps = TodoListStateProps & TodoListDispatchProps;


export class TodoList extends React.PureComponent<TodoListProps> {
  static displayName = 'TodoList';

  static propTypes = {
    itemIds: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    isFetchingAll: PropTypes.bool.isRequired,

    reloadAll: PropTypes.func.isRequired,
  };


  render(): JSX.Element {
    if (this.props.isFetchingAll) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', }} >
          <span
          >
            <PacmanLoader
              className="mx-auto"
              size={50}
              color="#36D7B7"
            />
          </span>
        </div>
      );
    }

    if (this.props.hasError) {
      return (
        <div className="popup">
          <div className="popup_inner">
            <h1>Oooooops, something terrible happened :(</h1>
            <button onClick={this.props.reloadAll}>
              Click to reload items
            </button>
          </div>

        </div>
      );
    }

    const todoItems: ReactNodeArray = this.props.itemIds
      .map((itemId: Guid, itemIndex: number) => (
        <TodoListItem
          id={itemId}
          index={itemIndex + 1}
          key={itemId}
        />
      ));
    return (
      <div className="list-group">
        {todoItems}
        <ItemToAdd />
      </div>
    );
  }
}
