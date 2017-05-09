import * as React from 'react';
import { IAction } from '../actions/IAction';
import '../loader.css';


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
        return (
          <div>
            <div className="rainbow">
              <span/>
            </div>
            <div className="nyan-cat">
              <div className="feet"/>
              <div className="tail">
                <span/>
              </div>
              <div className="body"/>
              <div className="head"/>
            </div>
          </div>
        )
      } else {
        return <LoadingComponent {...this.props} />;
      }
    }
  }

};

export { loader, IListLoaderDataProps, IListLoaderCallbacksProps };
