import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Item } from '../containers/Item';
import { AddItem } from '../containers/AddItem';
import { ListSorting, getListSortingArray } from '../constants/ListSorting';
import Timer = NodeJS.Timer;
import { getNow } from '../utils/getNow';

export interface IListStateProps {
  itemIds: Uuid[];
  sorting: ListSorting;
}

export interface IListDispatchProps {
  onSetListView: (view: ListSorting) => void;
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
    lastRenderTime: getNow()
  };

  updateRenderTime = () => this.setState(() => ({lastRenderTime: getNow()}));

  componentWillReceiveProps(): void {
    this.setState(() => ({lastRenderTime: getNow()}));
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
          <div
            className="btn-group"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-info"
              disabled={this.props.sorting === ListSorting.CreatedTime}
              onClick={this._changeViewToCreatedTime}
            >
              Created time
            </button>
            <button
              type="button"
              className="btn btn-info"
              disabled={this.props.sorting === ListSorting.LastUpdateTime}
              onClick={this._changeViewToLastUpdateTime}
            >
              Last update time
            </button>
          </div>
          {
            this.props.sorting === ListSorting.CreatedTime ? 'CreatedTime' : 'LastUpdateTime'
          }
          <ul className="list-group">
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

