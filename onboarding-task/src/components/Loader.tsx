import * as React from 'react';
import { IAction } from '../actions/IAction';

interface IListLoaderDataProps {
  isLoading: boolean;
}

interface IListLoaderCallbacksProps {
  load: () => Promise<IAction>,
}

const loader = (LoadingComponent: React.ComponentClass<IListLoaderDataProps & IListLoaderCallbacksProps>) => {
  return class extends React.PureComponent<IListLoaderDataProps & IListLoaderCallbacksProps, undefined> {
    static displayName = `Loader(${LoadingComponent.displayName})`;

    componentDidMount() {
      this.props.load();
    }

    render() {
      if (this.props.isLoading) {
        return (<div><div className="loader" type="text/css" rel="stylesheet" href="../loader.css" />Loading... </div>);
      } else {
        return <LoadingComponent {...this.props} />;
      }
    }
  }

};

export { loader, IListLoaderDataProps, IListLoaderCallbacksProps };
