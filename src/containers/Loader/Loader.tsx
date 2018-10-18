import { connect } from 'react-redux';
import {
  ILoaderStateProps,
  Loader as LoaderComponent
} from '../../components/Loader/Loader';
import { IAppState } from '../../reducers/IAppState';
import {StatusType} from '../../models/Status';

export enum loaderContentType {
  DEFAULT = 'DEFAULT',
  COMMON_CONTENT = 'COMMON_CONTENT',
  NO_SUCCESS = 'NO_SUCCESS',
}

const isCommonContent = (items: { status: StatusType }): boolean =>
  items.status.errorMessage === '' && !items.status.isFetching;

const isNotSuccessful = (items: { status: StatusType }): boolean =>
  items.status.errorMessage !== '' || !items.status.isFetching;

const getLoaderContentType = (items: { status: StatusType }): loaderContentType => {
  if (isCommonContent(items)) {
    return loaderContentType.COMMON_CONTENT;
  }
  if (isNotSuccessful(items)){
    return loaderContentType.NO_SUCCESS;
  }
  return loaderContentType.DEFAULT;
};

const mapStateToProps = ({items}: IAppState): ILoaderStateProps => ({
  content: getLoaderContentType(items),
});

export const Loader = connect(mapStateToProps)(LoaderComponent);
