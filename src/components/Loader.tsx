import * as React from 'react';
import { Page } from './Page';
import { loaderContent } from '../containers/Loader';
import * as PropTypes from 'prop-types';
import {UnsuccessfulLoadingPage} from '../containers/UnsuccessfulLoadingPage';
import {CatLoader} from './CatLoader';

export interface ILoaderStateProps {
  content: loaderContent;
}

const Loader: React.StatelessComponent<ILoaderStateProps> = ({content}) => {
  switch (content) {
    case loaderContent.NO_SUCCESS:
      return <UnsuccessfulLoadingPage />;
    case loaderContent.COMMON_CONTENT:
      return <Page />;
    default:
      return <CatLoader />;
  }
};

Loader.propTypes = {
  content: PropTypes.string.isRequired,
};

Loader.displayName = 'Loader';

export { Loader };
