import { IAppState } from '../stores/IAppState';
import { connect } from 'react-redux';
import { ErrorViewer, IErrorViewerDataProps } from '../components/ErrorViewer';

const mapStateToProps = (state: IAppState): IErrorViewerDataProps => ({
  errorList: state.errors,
});

const ErrorViewerContainer: React.ComponentClass<{}> = connect(mapStateToProps)(ErrorViewer);

export { ErrorViewerContainer }
