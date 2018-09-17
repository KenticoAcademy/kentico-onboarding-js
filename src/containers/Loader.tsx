import { connect } from 'react-redux';
import {
  ILoaderCallbackProps,
  ILoaderDataProps,
  Loader as LoaderComponent
} from '../components/Loader';
import { IAppState } from '../reducers/IAppState';
import { CreateFetchItems } from '../actions';
import { Dispatch } from 'redux';

export enum loaderContent {
  DEFAULT = 'DEFAULT',
  COMMON_CONTENT = 'COMMON_CONTENT',
  NO_SUCCESS = 'NO_SUCCESS',
}

const mapStateToProps = ({items}: IAppState): ILoaderDataProps => {
  let content: loaderContent;
  if (items.status.errorMessage === '' && !items.status.isFetching) content = loaderContent.COMMON_CONTENT;
  else if (items.status.errorMessage !== '' || !items.status.isFetching) content = loaderContent.NO_SUCCESS;
  else content = loaderContent.DEFAULT;

  return ({
    content,
    errorMessage: items.status.errorMessage,
  });
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): ILoaderCallbackProps => {
  return ({
    fetchItemsCall: () => dispatch(CreateFetchItems()),
  });
};

export const Loader = connect(mapStateToProps, mapDispatchToProps)(LoaderComponent);
