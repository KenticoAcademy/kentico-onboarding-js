import * as React from 'react';
import * as PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import { ListContent } from '../containers/ListContent';

export interface IListStateProps {
  readonly dataLoaded: boolean;
}

export interface IListDispatchProps {
  readonly getItems: () => void;
}

interface IListProps extends IListStateProps, IListDispatchProps {}

export class List extends React.PureComponent<IListProps> {
  static displayName = 'List';

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    dataLoaded: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    setTimeout(() => this.props.getItems(), 2000);
  }

  render() {
    return (
      (this.props.dataLoaded)
      ?
        <ListContent />
      :
        <div className="loader">
            <ReactLoading type="spinningBubbles" color="#D3D3D3" />
        </div>
    );
  }
}
