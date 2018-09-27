import * as React from 'react';
import { Page } from './Page';
import { loaderContent } from '../containers/Loader';
import * as PropTypes from 'prop-types';

export interface ILoaderDataProps {
  content: loaderContent;
  errorMessage: string;
}

const Loader: React.StatelessComponent<ILoaderDataProps> = ({content, errorMessage}) => {
  switch (content) {
    case loaderContent.NO_SUCCESS:
      return (
        <div className="warning__container">
          <div className="warning__content">
            <strong>{errorMessage}</strong>
          </div>
          <div className="warning__content">
            <img src="/images/sadCat.gif" width="200px" />
          </div>
          <div className="warning__content">
            Try again later.
          </div>
        </div>);
    case loaderContent.COMMON_CONTENT:
      return <Page />;
    default:
      return <img src="/images/catLoader.gif" width="200px" />;
  }
};

Loader.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Loader.displayName = 'Page';

export { Loader };
