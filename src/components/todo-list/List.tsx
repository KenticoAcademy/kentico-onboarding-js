import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AddedItem } from '../../containers/todo-list/AddedItem';
import { Item } from '../../containers/todo-list/Item';
import { Seq } from 'immutable';
import { Uuid } from '../../utils/generateId';

export interface IListDataProps {
  readonly ids: Seq.Indexed<Uuid>;
  isFetching: boolean;
  hasError: boolean;
  postError: boolean;
  postErrorMessage: string;
  errorMessage: string;
  putError: boolean;
  putErrorMessage: string;
  deleteError: boolean;
  deleteErrorMessage: string;
}

export interface IListCallbackProps {
  readonly onFetchItems: () => void;
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
        {this.props.postError
          ? (<div className="alert alert-danger">
            <span
              className="glyphicon glyphicon-warning-sign"
              aria-hidden="true"
            />
            <strong> ERROR: </strong>
            {this.props.postErrorMessage}
          </div>)
          : <div />}
        {this.props.putError
          ? (<div className="alert alert-danger">
            <span
              className="glyphicon glyphicon-warning-sign"
              aria-hidden="true"
            />
            <strong> ERROR: </strong>
            {this.props.putErrorMessage}
          </div>)
          : <div />}
        {this.props.deleteError
          ? (<div className="alert alert-danger">
            <span
              className="glyphicon glyphicon-warning-sign"
              aria-hidden="true"
            />
            <strong> ERROR: </strong>
            {this.props.deleteErrorMessage}
          </div>)
          : <div />}
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
            : <div className="alert alert-danger alert-dismissable fade in">
              <span
                className="glyphicon glyphicon-warning-sign"
                aria-hidden="true"
              />
              <button className="close" data-dismiss="alert" aria-label="close">&times;</button>
              <strong> ERROR: </strong>
              {this.props.errorMessage}

            </div>)
        }
      </div>
    );
  }
}
