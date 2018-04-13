import * as React from 'react';
import { ItemsList } from '../../containers/todo-list/ItemsList';
import { ListError } from './ListError';
import { IAction } from '../../actions/IAction';
import { PulseLoader } from 'react-spinners';

export interface IFetchDataProps {
  readonly fetchFailed: boolean;
  readonly errorMessage: string;
  readonly isFetching: boolean;
}

export interface IFetchCallbackProps {
  readonly onFetchItems: () => void;
  readonly onFetchErrorClose: () => IAction;
  readonly onFetchStart: () => IAction;
}

export class ListPage extends React.PureComponent<IFetchDataProps & IFetchCallbackProps> {

  constructor(props: IFetchDataProps & IFetchCallbackProps) {
    super(props);
  }

  componentDidMount() {
    this._startLoadingItems();
  }

  render(): JSX.Element {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          {this.props.isFetching
            ? <div className="text-center">
              <PulseLoader loading={this.props.isFetching} />
            </div>
            : !this.props.fetchFailed
              ? <ItemsList />
              : <ListError
                errorMessage={this.props.errorMessage}
                onRetryFetch={this._startLoadingItems}
              />
          }
        </div>
      </div>
    );
  }

  private _startLoadingItems = () => {
    this.props.onFetchStart();
    this.props.onFetchItems();
  };
}
