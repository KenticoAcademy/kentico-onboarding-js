import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Item } from '../containers/Item';
import { AddItem } from '../containers/AddItem';
import { ListSorting, getListSortingArray } from '../constants/ListSorting';
import Timer = NodeJS.Timer;
import { getCurrentDateTime } from '../utils/getCurrentDateTime';

export interface IListStateProps {
  readonly itemIds: Uuid[];
  readonly sorting: ListSorting;
}

export interface IListDispatchProps {
  readonly onSetListView: (view: ListSorting) => void;
}

type IListProps = IListStateProps & IListDispatchProps;

interface IListState {
  lastRenderTime: Time;
}

export class List extends React.PureComponent<IListProps, IListState> {
  static displayName = 'List';

  static propTypes = {
    itemIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    sorting: PropTypes.oneOf(getListSortingArray()).isRequired,
    onSetListView: PropTypes.func.isRequired,
  };

  interval: Timer;

  state = {
    lastRenderTime: getCurrentDateTime()
  };

  updateRenderTime = () => this.setState(() => ({lastRenderTime: getCurrentDateTime()}));

  componentWillReceiveProps(): void {
    this.setState(() => ({lastRenderTime: getCurrentDateTime()}));
  }

  componentDidMount(): void {
    this.interval = setInterval(this.updateRenderTime, 30000);
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  _changeViewToCreatedTime = () => this.props.onSetListView(ListSorting.CreatedTime);

  _changeViewToLastUpdateTime = () => this.props.onSetListView(ListSorting.LastUpdateTime);

  render(): JSX.Element {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-16">
          <ul className="nav nav-tabs border-info">
            <li className="nav-item">
              <div
                className={this.props.sorting === ListSorting.CreatedTime ? 'nav-link active border-info border-bottom-0 text-info' : 'nav-link'}
                onClick={this._changeViewToCreatedTime}
              >Created time</div>
            </li>
            <li className="nav-item">
              <div
                className={this.props.sorting === ListSorting.LastUpdateTime ? 'nav-link active border-info border-bottom-0 text-info' : 'nav-link'}
                onClick={this._changeViewToLastUpdateTime}
              >Last update time</div>
            </li>
          </ul>
          <ul className="list-group list-group-flush border border-info rounded-bottom">
            <AddItem />
            {
              this.props.itemIds.map((id: Uuid) => (
                <Item
                  key={id}
                  id={id}
                  lastRenderTime={this.state.lastRenderTime}
                />
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}
