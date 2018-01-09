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
  hasError: boolean;
  errorMessage: String;
}

export interface IListCallbackProps {
  readonly onFetchItems: () => void;
  readonly onAddItem: (text: string, id: Uuid) => void;
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
    this.props.onFetchItems();
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
          : (!this.props.hasError
            ? <div className="col-sm-12 col-md-offset-2 col-md-8">
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
            </div>
            : <div className="alert alert-danger">
              <span
                className="glyphicon glyphicon-warning-sign"
                aria-hidden="true"
              />
              <strong> ERROR: </strong>
              {this.props.errorMessage}
            </div>)
        }
      </div>
    );
  }
}
