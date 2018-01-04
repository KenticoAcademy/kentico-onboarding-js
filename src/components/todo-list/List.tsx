import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AddedItem } from '../../containers/todo-list/AddedItem';
import { TsComponent } from './TsComponent';
import { Item } from '../../containers/todo-list/Item';
import { Seq } from 'immutable';
import { Uuid } from '../../utils/generateId';

export interface IListDataProps {
  readonly ids: Seq.Indexed<Uuid>;
  isFetching: boolean;
}

export interface IListCallbackProps {
  readonly onFetchFinished: () => void;
}

const Loading = require('react-loading-animation');

export class List extends React.PureComponent<IListDataProps & IListCallbackProps> {
  static propTypes = {
    ids: PropTypes.instanceOf(Seq).isRequired,
    isFetching: PropTypes.bool,
  };

  constructor(props: IListDataProps & IListCallbackProps) {
    super(props);
  }

  componentDidMount() {
    fetch('/v1/items')
      .then((data) => data.json())
      .then(() => setTimeout(() => this.props.onFetchFinished(), 2000));
  }

  render(): JSX.Element {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>
        {this.props.isFetching
          ? <Loading />
          : <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ul className="list-group">
              {this.props.ids
                .map((id: Uuid, index: number) =>
                  <li
                    className="list-group-item"
                    key={id}
                  >
                    <Item
                      id={id}
                      index={index + 1}
                    />
                  </li>,
                )
              }
              <AddedItem />
            </ul>
          </div>}

      </div>
    );
  }
}
