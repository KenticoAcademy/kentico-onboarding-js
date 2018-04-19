import * as React from 'react';
import { ItemsList } from '../../containers/todo-list/ItemsList';
import { ListError } from './ListError';
import { PulseLoader } from 'react-spinners';
import { ListPageState } from '../../enums/listPageState';

export interface IFetchDataProps {
  readonly listPageState: ListPageState;
}

export interface IFetchCallbackProps {
  readonly onFetchItems: () => void;
  readonly onFetchErrorClose: () => void;
  readonly onFetchStart: () => void;
}

export class ListPage extends React.PureComponent<IFetchDataProps & IFetchCallbackProps> {

  constructor(props: IFetchDataProps & IFetchCallbackProps) {
    super(props);
  }

  componentDidMount() {
    this._startLoadingItems();
  }

  render(): JSX.Element {
    const { listPageState } = this.props;

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          {listPageState === ListPageState.Loading
            ? <div className="text-center">
              <PulseLoader />
            </div>
            : listPageState === ListPageState.Loaded
              ? <ItemsList />
              : <ListError
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
