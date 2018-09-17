import * as React from 'react';
import { Page } from './Page';
import { loaderContent } from '../containers/Loader';
import { IAction } from '../actions/IAction';
import * as PropTypes from 'prop-types';

export interface ILoaderCallbackProps {
  fetchItemsCall: () => Promise<IAction>;
}

export interface ILoaderDataProps {
  content: loaderContent;
  errorMessage: string;
}

const Loader: React.StatelessComponent<ILoaderDataProps&ILoaderCallbackProps> = ({content, fetchItemsCall, errorMessage}) => {
  switch (content) {
    case loaderContent.NO_SUCCESS:
      return (
        <div className="alert alert-danger alert-dismissible">
          <button onClick={fetchItemsCall} className="close" data-dismiss="alert" aria-label="close">&#x21BA;</button>
          Try again later. <strong>{errorMessage}</strong>
        </div>);
    case loaderContent.COMMON_CONTENT:
      return <Page />;
    default:
      return <img src="https://media.giphy.com/media/9wbzlCmiTbIwU/giphy.gif" className="img-circle center-block catLoader" width="200px" />;
  }
};

Loader.propTypes = {
  fetchItemsCall: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Loader.displayName = 'Page';

export { Loader };
