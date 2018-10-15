import { connect } from 'react-redux';
import {
  ILoaderStateProps,
  Loader as LoaderComponent
} from '../components/Loader';
import { IAppState } from '../reducers/IAppState';
export enum loaderContent {
  DEFAULT = 'DEFAULT',
  COMMON_CONTENT = 'COMMON_CONTENT',
  NO_SUCCESS = 'NO_SUCCESS',
}

const mapStateToProps = ({items}: IAppState): ILoaderStateProps => {
  let content: loaderContent;
  if (items.status.errorMessage === '' && !items.status.isFetching) content = loaderContent.COMMON_CONTENT;
  else if (items.status.errorMessage !== '' || !items.status.isFetching) content = loaderContent.NO_SUCCESS;
  else content = loaderContent.DEFAULT;

  return ({
    content,
  });
};

export const Loader = connect(mapStateToProps)(LoaderComponent);
