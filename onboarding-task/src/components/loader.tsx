import * as React from 'react';
import { IAction } from '../actions/IAction';
import '../loader.css';


interface IListLoaderDataProps {
  isLoading: boolean;
}

interface IListLoaderCallbacksProps {
  load: () => Promise<IAction>;
}

const loaderComponent: JSX.Element =
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
  </div>;

const loader = (LoadedComponent: React.ComponentClass<{}>) =>
  class extends React.PureComponent<IListLoaderDataProps & IListLoaderCallbacksProps, undefined> {
    static displayName = `loader(${LoadedComponent.displayName})`;

    componentDidMount() {
      this.props.load();
    }

    render() {
      if (this.props.isLoading) {
        return (
          loaderComponent
        );
      } else {
        return <LoadedComponent/>;
      }
    }
  };


export { loader, IListLoaderDataProps, IListLoaderCallbacksProps };
