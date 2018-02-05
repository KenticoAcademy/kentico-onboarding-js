import * as React from 'react';
import { List } from '../containers/todo-list/List';
import { Error } from '../containers/todo-list/Error';

export interface IFetchDataProps {
  fetchFailed: boolean;
}

export interface IFetchCallbackProps {
  readonly onFetchItems: () => void;
}

export class FetchedItems extends React.PureComponent<IFetchDataProps & IFetchCallbackProps> {

  constructor(props: IFetchDataProps & IFetchCallbackProps) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchItems();
  }

  render(): JSX.Element {
    return (
      <div className="row">
        {!this.props.fetchFailed
          ? <List />
          : <Error />
        }
      </div>
    );
  }
}
