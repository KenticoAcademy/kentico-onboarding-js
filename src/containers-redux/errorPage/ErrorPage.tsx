import {
  connect,
  Dispatch
} from 'react-redux';
import { IStoreState } from '../../reducers/IStoreState';
import {
  ErrorPage as ErrorPageComponent,
  IErrorPageCallbacksProps,
  IErrorPageDataProps
} from '../../components/errorPage/ErrorPage';
import { getAllNotes } from '../../actions/index';
import { getErrorById } from '../../selectors/errors/getErrorById';

interface IOwnProps {
  readonly errorMessage: string;
}

const mapStateToProps = ({ notes, errors }: IStoreState, ownProps: IOwnProps): IErrorPageDataProps => {
  const error = getErrorById(errors, notes.loader.errorId);

  return {
    detailErrorMessage: error.errorDescription,
    errorId: notes.loader.errorId,
    errorMessage: ownProps.errorMessage,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): IErrorPageCallbacksProps => ({
  onReloadClick: (errorId?: Guid) =>
    dispatch(getAllNotes(errorId)),
});

export const ErrorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorPageComponent);
