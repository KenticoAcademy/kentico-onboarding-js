import * as React from 'react';
import { Page } from '../Page';
import { loaderContentType } from '../../containers/Loader/Loader';
import * as PropTypes from 'prop-types';
import {UnsuccessfulLoadingPage} from '../../containers/Loader/UnsuccessfulLoadingPage';
import {CatLoader} from './CatLoader';
import {ReactElement} from 'react';

export interface ILoaderStateProps {
  content: loaderContentType;
}

const getCorrectContent = (content: loaderContentType): ReactElement<any> => {
  switch (content) {
    case loaderContentType.NO_SUCCESS:
      return <UnsuccessfulLoadingPage />;
    case loaderContentType.COMMON_CONTENT:
      return <Page />;
    default:
      return <CatLoader />;
  }
};

const Loader: React.StatelessComponent<ILoaderStateProps> = ({content}) =>
  (getCorrectContent(content));

Loader.propTypes = {
  content: PropTypes.string.isRequired,
};

Loader.displayName = 'Loader';

export { Loader };
