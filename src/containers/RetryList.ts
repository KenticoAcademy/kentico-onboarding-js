import {
  connect,
  Dispatch,
  ComponentClass,
} from 'react-redux';
import {
  Retry as RetryComponent,
  IRetryCallbackProps,
  IRetryProps
} from '../components/Retry';
import { IAction } from '../models/interfaces/IAction';
import {
  fetchItemsAsync,
  retryActionAsync
} from '../actions/thunk';

export interface IRetryListContainerProps {
  uri: string;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>, { uri }: IRetryListContainerProps): IRetryCallbackProps => ({
  retryAction: () =>
    dispatch(
      retryActionAsync(fetchItemsAsync)({
        uri,
      }) as any),
});

const mergeProps = (_: undefined, { retryAction }: IRetryCallbackProps): IRetryProps => ({
  retryAction,
  description: 'Fetching items from server failed',
});

export const RetryList: ComponentClass<IRetryListContainerProps> = connect(
  undefined,
  mapDispatchToProps,
  mergeProps,
)(RetryComponent);
