import { IAppState } from '../reducers/IAppState';
import { connect } from 'react-redux';
import { ErrorViewer, IErrorViewerDataProps, IErrorViewerCallbacksProps } from '../components/ErrorViewer';
import { deleteError } from '../actions/actionCreators';

const mapStateToProps = (state: IAppState): IErrorViewerDataProps => ({
  errorList: state.itemsList.errors,
});

const mapDispatchToProps = (dispatch: Dispatch): IErrorViewerCallbacksProps => ({
  onErrorClose: (id: string) => dispatch(deleteError(id)),
});

const ErrorViewerContainer: React.ComponentClass<{}> = connect(mapStateToProps, mapDispatchToProps)(ErrorViewer);

export { ErrorViewerContainer }
